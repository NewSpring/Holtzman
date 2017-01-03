#!/usr/bin/env sh

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}

# force script to error out at first error
set -e

### XXX how do we make this dynamic without tags?
if [ -z "$TRAVIS_TAG" ]; then
  echo "No tags found, no need for a build since we currently have no tests."
  exit 0
fi

CURRENT_TAG=$(git describe --exact-match --abbrev=0 --tags)
APP=$(echo "$CURRENT_TAG" | cut -d'/' -f1)
DEST=$(echo "$CURRENT_TAG" | cut -d'/' -f2)
CHANNEL=$(echo "$CURRENT_TAG" | cut -d'/' -f3)

# exit if it's a linux container and a native build
if [ "$TRAVIS_OS_NAME" != "osx" ] && [ "$DEST" = "native" ]; then
  echo "Not deploying app on $TRAVIS_OS_NAME"
  exit 0
fi
# exit if it's an osx container and a web build
if [ "$TRAVIS_OS_NAME" = "osx" ] && [ "$DEST" != "native" ]; then
  echo "Not deploying app on $TRAVIS_OS_NAME"
  exit 0
fi

yecho "### Installing Meteor ###"
if [ ! -d "$DIRECTORY" ]; then curl https://install.meteor.com | /bin/sh; fi
export PATH=$PATH:$HOME/.meteor

yecho "### Apollos Setup ###"
npm link
apollos setup

yecho "### Settings Grab ###"
cd .remote
git clone git@github.com:NewSpring/ops-settings.git settings
