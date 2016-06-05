#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  echo "Not building app on ${TRAVIS_OS_NAME}"
  exit 0
fi

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}


yecho "### Entering app directory ###"
cd sites/app

yecho "### Installing Meteor ###"
curl https://install.meteor.com | /bin/sh

yecho "### Installing NPM deps ###"
npm install

yecho "### Installing Norma ###"
npm install -g NewSpring/Norma#forked-cson

yecho "### Downloading things with Norma ###"
norma build

yecho "### Remove platforms for Gagarin workaround ###"
meteor remove-platform ios android

yecho "### Preparing Gagarin test build ###"
npm install -g gagarin
cp ./.remote/settings/sites/app.newspring.io/alpha.settings.json ./settings.json
meteor build --directory ./.gagarin/local --server localhost:3000
pwd
cd ./.gagarin/local/bundle/programs/server/ && npm i
cd ~/apollos
pwd

yecho "### Starting Chromedriver ###"
./node_modules/chromedriver/lib/chromedriver/chromedriver --port=9515 &

yecho "### Running App Tests ###"
npm test
