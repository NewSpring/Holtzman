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

if [[ "$TRAVIS_BRANCH" != "master" ]]; then
  echo "Testing on a branch other than master. No deployment will be done."
  exit 0
fi

CURRENT_TAG=`git describe --exact-match --abbrev=0 --tags`

if [[ $CURRENT_TAG == "" ]]; then
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
cd sites/app

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

yecho "### Installing node 4 ###"
nvm install node4-lts && nvm use node4-lts

yecho "### Installing Android sdks ###"
brew install android-sdk
echo export ANDROID_HOME=/usr/local/opt/android-sdk >> ~/.bashrc
echo y | android update sdk --no-ui --all --filter tools,platform-tools,build-tools-23.0.3,android-23
echo export ANDROID_ZIPALIGN=/usr/local/opt/android-sdk/build-tools/23.0.2/zipalign >> ~/.bashrc

yecho "### Moving settings and certs ###"
cp ./.remote/settings/sites/app.newspring.io/apollos.pem ./apollos.pem
cp ./.remote/settings/sites/app.newspring.io/compose.pem ./compose.pem
cp ./.remote/settings/sites/app.newspring.io/androidkey ~/.keystore
cp ./.remote/settings/ssl/bundle.crt .
cp ./.remote/settings/ssl/private.key .

yecho "### Installing launch ###"
git clone git@github.com:NewSpring/meteor-launch.git .launch && cd .launch && npm install && npm link && cd ..
cp ./.remote/settings/sites/app.newspring.io/launch.json ./launch.json

yecho "### Updating fastlane ###"
sudo gem update fastlane

yecho "### Installing aws and boto3 ###"
python --version
sudo pip install awscli boto3

yecho "### Configuring aws tool ###"
aws --version
aws configure set default.aws_access_key_id $AWS_ACCESS_KEY
aws configure set default.aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region us-east-1

echo export ROOT_URL="https://${CHANNEL}-app.newspring.io" >> ~/.bashrc

yecho "### Building for linux environment ###"
meteor build .build --architecture os.linux.x86_64 --server "${CHANNEL}-app.newspring.io"
ls .build

yecho "### Uploading bundle to S3 ###"
aws s3 cp .build/$TRAVIS_REPO_SLUG.tar.gz s3://ns.ops/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

yecho "### Updating ECS ###"
# BUNDLE_URL="http://ns.ops.s3.amazonaws.com/apollos/$CURRENT_TAG-$TRAVIS_COMMIT.tar.gz" .ecs/update_ecs.sh

yecho "### Adding ios and android platforms ###"
meteor add-platform ios android

if [ "${CHANNEL}" == "alpha" ]; then
  yecho "### Deploying to Hockey ###"
  # launch hockey https://alpha-app.newspring.io ./.remote/settings/sites/app.newspring.io/alpha.settings.json
fi

if [ "${CHANNEL}" == "beta" ]; then
  yecho "### Deploying to TestFlight ###"
  # launch hockey https://beta-app.newspring.io ./.remote/settings/sites/app.newspring.io/beta.settings.json
fi
