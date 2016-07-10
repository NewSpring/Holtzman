#!/usr/bin/env sh

# force script to error out at first error
set -e

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  echo "Not preparing app on ${TRAVIS_OS_NAME}"
  exit 0
fi

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}


yecho "### Installing Meteor ###"
if [ ! -d "$DIRECTORY" ]; then curl https://install.meteor.com | /bin/sh; fi
export PATH=$PATH:$HOME/.meteor

yecho "### Installing NPM deps ###"
npm install
npm link

yecho "### Apollos Setup ###"
meteor npm run apollos setup newspring

yecho "### Settings Grab ###"
cd ../sites/newspring/.remote
git clone git@github.com:NewSpring/ops-settings.git settings
cd settings && git checkout refactor # temp until confirmed working

# yecho "### Preparing Gagarin test build ###"
# npm install -g gagarin
# cp ./.remote/settings/sites/app.newspring.io/alpha.settings.json ./settings.json
# meteor build --directory ./.gagarin/local --server localhost:3000
# cd ./.gagarin/local/bundle/programs/server/ && npm i
