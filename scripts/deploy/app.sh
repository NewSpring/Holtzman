#!/usr/bin/env sh

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "This is a pull request. No deployment will be done."
  exit 0
fi

if [ -z "$TRAVIS_TAG" ]; then
  echo "No tags found, no need for a release."
  exit 0
fi


YELLOW=$(tput setaf 3)
yecho () {
        echo "${YELLOW}$1"
}

# force script to error out at first error
set -e

CURRENT_TAG=$(git describe --exact-match --abbrev=0 --tags)

PREVIOUS_TAG=$(git describe HEAD^1 --abbrev=0 --tags)
GIT_HISTORY=$(git log --no-merges --format="- %s" "$PREVIOUS_TAG"..HEAD)

if [ -z "$PREVIOUS_TAG" ]; then
  GIT_HISTORY=$(git log --no-merges --format="- %s")
fi


yecho "Current Tag: $CURRENT_TAG"
yecho "Previous Tag: $PREVIOUS_TAG"
yecho "Release Notes:

$GIT_HISTORY

"

APP=$(echo "$CURRENT_TAG" | cut -d'/' -f1)
DEST=$(echo "$CURRENT_TAG" | cut -d'/' -f2)
CHANNEL=$(echo "$CURRENT_TAG" | cut -d'/' -f3)

# exit if it's a linux container and a native build
if [ "$TRAVIS_OS_NAME" != "osx" -a "$DEST" == "native" ]; then
  echo "Not deploying app on $TRAVIS_OS_NAME"
  exit 0
fi
# exit if it's an osx container and a web build
if [ "$TRAVIS_OS_NAME" == "osx" -a "$DEST" != "native" ]; then
  echo "Not deploying app on $TRAVIS_OS_NAME"
  exit 0
fi

yecho "### Entering app directory ###"
cd "sites/$APP"

yecho "### Creating settings for the $CHANNEL of $APP:$DEST"
URLPREFIX="my"
if [ "$DEST" == "native" ]; then URLPREFIX="native"; fi
METEOR_SETTINGS_PATH="$TRAVIS_BUILD_DIR/sites/${APP}/.remote/settings/sites/${APP}/${CHANNEL}.settings.json"
ROOT_URL="https://${CHANNEL}-${URLPREFIX}.newspring.cc"
ECS_TASK_NAME="$DEST" # XXX long term this should be $APP or maybe $APP-$DEST
ECS_CLUSTER=apollos # XXX move to Guild
ECS_FAMILY="$DEST"
ECS_SERVICE="$CHANNEL-#DEST"
BUNDLE_URL="http://ns.ops.s3.amazonaws.com/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz"
HOST_PORT=8080 # production newspring web
if [ "$DEST" == "native" -a "$CHANNEL" == "alpha" ]; then HOST_PORT=8062; fi
if [ "$DEST" == "native" -a "$CHANNEL" == "beta" ]; then HOST_PORT=8072; fi
if [ "$DEST" == "native" -a "$CHANNEL" == "prod" ]; then HOST_PORT=8082; fi
if [ "$DEST" == "web" -a "$CHANNEL" == "beta" ]; then HOST_PORT=8070; fi




yecho "### Deploying $APP:$DEST to $CHANNEL ###"
if [ "$DEST" == "native" ]; then
  yecho "### Installing Android sdks ###"
  brew install android-sdk
  echo export ANDROID_HOME=/usr/local/opt/android-sdk >> ~/.bashrc
  echo y | android update sdk --no-ui --all --filter tools,platform-tools,build-tools-23.0.3,android-23
  echo export ANDROID_ZIPALIGN=/usr/local/opt/android-sdk/build-tools/23.0.3/zipalign >> ~/.bashrc

  yecho "### Moving settings and certs ###"
  cp ./.remote/settings/sites/$APP/androidkey ~/.keystore

  yecho "### Updating fastlane ###"
  gem install fastlane --no-ri --no-rdoc

  yecho "### Installing launch ###"
  npm install -g meteor-launch
  cp ./.remote/settings/sites/$APP/launch.json ./launch.json

  yecho "### Installing python ###"
  brew install python

  yecho "### Installing jq ###"
  brew install jq

fi

yecho "### Installing aws and boto3 ###"
python --version
sudo pip install awscli boto3

yecho "### Configuring aws tool ###"
aws --version
aws configure set default.aws_access_key_id $AWS_ACCESS_KEY
aws configure set default.aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region us-east-1


yecho "### Building for linux environment https://${CHANNEL}-${URLPREFIX}.newspring.cc ###"
cd apollos && ${DEST^^}=true npm run compile && cd ..
rm -rf sites/$APP/.meteor/local
${DEST^^}=true launch build $ROOT_URL $METEOR_SETTINGS_PATH

yecho "### SO FAR SO GOOD"
exit 0

yecho "### Uploading bundle to S3 ###"
aws s3 cp .build/newspring s3://ns.ops/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

yecho "### Updating ECS ###"
# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

# sets $task_def
make_task_def() {
    meteor_settings=$(cat $METEOR_SETTINGS_PATH | $JQ . | sed 's/\"/\\"/g' | tr -d '\n')
    task_template='[
      {
        "name": "'"$ECS_TASK_NAME"'",
        "memory": 512,
        "cpu": 512,
        "essential": true,
        "image": "meteorhacks/meteord:binbuild",
        "portMappings": [
          { "hostPort": '"$HOST_PORT"', "containerPort": 80, "protocol": "tcp" }
        ],
        "environment": [
          { "name": "REBUILD_NPM_MODULES", "value": "1" },
          { "name": "MONGO_URL", "value": "'"$MONGO_URL"'" },
          { "name": "DISABLE_WEBSOCKETS", "value": "1" },
          { "name": "ROOT_URL", "value": "'"$ROOT_URL"'" },
          { "name": "BUNDLE_URL", "value": "'"$BUNDLE_URL"'" },
          { "name": "OPLOG_URL", "value": "'"$OPLOG_URL"'" },
          { "name": "METEOR_SETTINGS", "value": "'"$meteor_settings"'" },
          { "name": "TZ", "value": "America/New_York" }
        ]
      }
    ]'
}

register_definition() {
  if revision=$(aws ecs register-task-definition --container-definitions "$task_template" --family $ECS_FAMILY | $JQ '.taskDefinition.taskDefinitionArn'); then
    yecho "Revision: $revision"
  else
    echo "Failed to register task definition"
    return 1
  fi
}

deploy_cluster() {
  make_task_def
  register_definition
  if [ $(aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --task-definition $revision | \
               $JQ '.service.taskDefinition') != $revision ]; then
    echo "Error updating service."
    return 1
  fi
  return 0
}

deploy_cluster


if [ "$DEST" == "web" ]; then
  yecho "### $APP deployed to $ROOT_URL"
  exit 0
fi

yecho "### Deploying app bundle ###"
if [ "$CHANNEL" == "alpha" ]; then
  yecho "### Deploying to Hockey ###"
  launch hockey ROOT_URL $METEOR_SETTINGS_PATH
fi

if [ "$CHANNEL" == "beta" ]; then
  yecho "### Deploying to TestFlight ###"
  launch testflight ROOT_URL $METEOR_SETTINGS_PATH
fi
