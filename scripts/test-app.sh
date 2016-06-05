#!/usr/bin/env sh

# exit if it's a linux container
if [ "${TRAVIS_OS_NAME}" != "osx" ]; then
  exit 0
fi

echo "this is osx"
