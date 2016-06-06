#!/usr/bin/env sh

# force script to error out at first error
set -e

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

CURRENT_TAG=`git describe --exact-match --abbrev=0 --tags`

if [[ $CURRENT_TAG == "" ]]; then
  echo "No tags found, no need for a release."
  exit 0
fi

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}


yecho "### Entering app directory ###"
cd sites/app

PREVIOUS_TAG=`git describe HEAD^1 --abbrev=0 --tags`
GIT_HISTORY=`git log --no-merges --format="- %s" $PREVIOUS_TAG..HEAD`

if [[ $PREVIOUS_TAG == "" ]]; then
  GIT_HISTORY=`git log --no-merges --format="- %s"`
fi

yecho "Current Tag: $CURRENT_TAG"
yecho "Previous Tag: $PREVIOUS_TAG"
yecho "Release Notes:

$GIT_HISTORY"
