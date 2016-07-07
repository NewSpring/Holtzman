#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  echo "Not deploying app on ${TRAVIS_OS_NAME}"
  exit 0
fi

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "This is a pull request. No deployment will be done."
  exit 0
fi

# if [[ "$TRAVIS_BRANCH" != "master" ]]; then
#   echo "Testing on a branch other than master. No deployment will be done."
#   exit 0
# fi

if [[ $TRAVIS_TAG == "" ]]; then
  echo "No tags found, no need for a release."
  exit 0
fi

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}

# force script to error out at first error
set -e

yecho "### Entering app directory ###"
cd sites/newspring

CURRENT_TAG=`git describe --exact-match --abbrev=0 --tags`

PREVIOUS_TAG=`git describe HEAD^1 --abbrev=0 --tags`
GIT_HISTORY=`git log --no-merges --format="- %s" $PREVIOUS_TAG..HEAD`

if [[ $PREVIOUS_TAG == "" ]]; then
  GIT_HISTORY=`git log --no-merges --format="- %s"`
fi

APP=$(echo $CURRENT_TAG | cut -d'/' -f1)
CHANNEL=$(echo $CURRENT_TAG | cut -d'/' -f2)

if [[ $APP != "app" ]]; then
  echo "Not deploying the app because this release is for $APP"
  exit 0
fi

yecho "### Deploying $APP to $CHANNEL ###"

yecho "Current Tag: $CURRENT_TAG"
yecho "Previous Tag: $PREVIOUS_TAG"
yecho "Release Notes:

$GIT_HISTORY"

yecho "### Installing jq ###"
brew update
brew install jq

yecho "### Installing Android sdks ###"
brew install android-sdk
echo export ANDROID_HOME=/usr/local/opt/android-sdk >> ~/.bashrc
echo y | android update sdk --no-ui --all --filter tools,platform-tools,build-tools-23.0.3,android-23
echo export ANDROID_ZIPALIGN=/usr/local/opt/android-sdk/build-tools/23.0.3/zipalign >> ~/.bashrc

yecho "### Moving settings and certs ###"
cp ./.remote/settings/sites/app.newspring.io/apollos.pem ./apollos.pem
cp ./.remote/settings/sites/app.newspring.io/compose.pem ./compose.pem
cp ./.remote/settings/sites/app.newspring.io/androidkey ~/.keystore
cp ./.remote/settings/ssl/bundle.crt .
cp ./.remote/settings/ssl/private.key .

yecho "### Updating fastlane ###"
gem install fastlane && gem update fastlane

yecho "### Installing aws and boto3 ###"
brew install python
python --version
sudo pip install awscli boto3

yecho "### Configuring aws tool ###"
aws --version
aws configure set default.aws_access_key_id $AWS_ACCESS_KEY
aws configure set default.aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region us-east-1

yecho "### Installing launch ###"
npm install -g meteor-launch
cp ./.remote/settings/sites/app.newspring.io/launch.json ./launch.json

yecho "### Building for linux environment https://${CHANNEL}-app.newspring.io ###"
launch build "https://${CHANNEL}-app.newspring.io" "$TRAVIS_BUILD_DIR/sites/app/.remote/settings/sites/app.newspring.io/${CHANNEL}.settings.json"

yecho "### Uploading bundle to S3 ###"
aws s3 cp .build/newspring s3://ns.ops/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

yecho "### Updating ECS ###"

if [ "${CHANNEL}" == "alpha" ]; then
  MONGO_URL=$DOCKER_MONGO_URL OPLOG_URL=$DOCKER_OPLOG_URL ROOT_URL="https://${CHANNEL}-app.newspring.io" METEOR_SETTINGS_PATH="$TRAVIS_BUILD_DIR/sites/app/.remote/settings/sites/app.newspring.io/${CHANNEL}.settings.json" ECS_TASK_NAME=app ECS_CLUSTER=apollos ECS_FAMILY=app ECS_SERVICE=alpha-app HOST_PORT=8062 BUNDLE_URL="http://ns.ops.s3.amazonaws.com/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz" $TRAVIS_BUILD_DIR/scripts/deploy/ecs.sh

  yecho "### Deploying to Hockey ###"
  launch hockey https://alpha-app.newspring.io $METEOR_SETTINGS_PATH
fi

if [ "${CHANNEL}" == "beta" ]; then
  ROOT_URL="https://${CHANNEL}-app.newspring.io" METEOR_SETTINGS_PATH="$TRAVIS_BUILD_DIR/sites/app/.remote/settings/sites/app.newspring.io/${CHANNEL}.settings.json" ECS_TASK_NAME=app ECS_CLUSTER=apollos ECS_FAMILY=app ECS_SERVICE=beta-app HOST_PORT=8072 BUNDLE_URL="http://ns.ops.s3.amazonaws.com/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz" $TRAVIS_BUILD_DIR/scripts/deploy/ecs.sh

  yecho "### Deploying to TestFlight ###"
  launch testflight https://beta-app.newspring.io $METEOR_SETTINGS_PATH
fi
