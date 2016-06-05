#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  exit 0
fi

echo "### Entering app directory ###"
cd sites/app

echo "### Installing Meteor ###"
curl https://install.meteor.com | /bin/sh

echo "### Installing NPM deps ###"
npm install

echo "### Installing Norma ###"
npm install -g NewSpring/Norma#forked-cson

echo "### Downloading things with Norma ###"
norma build

echo "### Remove platforms for Gagarin workaround ###"
meteor remove-platform ios android

echo "### Preparing Gagarin test build ###"
npm install -g gagarin
cp ./.remote/settings/sites/app.newspring.io/alpha.settings.json ./settings.json
meteor build --directory ./.gagarin/local --server localhost:3000
cd ./.gagarin/local/bundle/programs/server/ && npm i

echo "### Starting Chromedriver ###"
./node_modules/.bin/chromedriver --port=9515 &

echo "### Running App Tests ###"
npm test
