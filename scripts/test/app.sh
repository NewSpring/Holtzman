#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  exit 0
fi

# enter app directory
cd sites/app

# brew
brew install brew-cask

# meteor
# if [ ! -f $HOME/.meteor/meteor ]; then curl https://install.meteor.com | sh; fi
curl https://install.meteor.com | sh

# chrome
brew cask install google-chrome
brew install chromedriver

# install app deps
npm install

# norma build
npm install -g NewSpring/Norma#forked-cson
norma build

# remove packages for gagarin work around
meteor remove-platform ios android

# prepare test build of app
npm install -g gagarin
cp ./.remote/settings/sites/app.newspring.io/alpha.settings.json ./settings.json
meteor build --directory ./.gagarin/local --server localhost:3000
cd ./.gagarin/local/bundle/programs/server/ && npm i

# start chromedriver
chromedriver --port=9515

# test
npm test
