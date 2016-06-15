#!/usr/bin/env sh

# force script to error out at first error
set -e

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  echo "Not testing app on ${TRAVIS_OS_NAME}"
  exit 0
fi

YELLOW=`tput setaf 3`
yecho () {
  echo "${YELLOW}$1"
}


yecho "### Entering app directory ###"
cd sites/app

yecho "### Starting Chromedriver ###"
./node_modules/chromedriver/lib/chromedriver/chromedriver --port=9515 &

yecho "### Running App Tests ###"
npm test
