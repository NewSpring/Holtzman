#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  echo "Not building app on ${TRAVIS_OS_NAME}"
  exit 0
fi

YELLOW=`tput setaf 3`

echo "${YELLOW}### Entering app directory ###"
cd sites/app

echo "${YELLOW}### Installing Meteor ###"
curl https://install.meteor.com | /bin/sh

echo "${YELLOW}### Installing NPM deps ###"
npm install

echo "${YELLOW}### Installing Norma ###"
npm install -g NewSpring/Norma#forked-cson

echo "${YELLOW}### Downloading things with Norma ###"
norma build

echo "${YELLOW}### Remove platforms for Gagarin workaround ###"
meteor remove-platform ios android

echo "${YELLOW}### Preparing Gagarin test build ###"
npm install -g gagarin
cp ./.remote/settings/sites/app.newspring.io/alpha.settings.json ./settings.json
meteor build --directory ./.gagarin/local --server localhost:3000
cd ./.gagarin/local/bundle/programs/server/ && npm i

echo "${YELLOW}### Starting Chromedriver ###"
./node_modules/chromedriver/lib/chromedriver/chromedriver --port=9515 &

echo "${YELLOW}### Running App Tests ###"
npm test
