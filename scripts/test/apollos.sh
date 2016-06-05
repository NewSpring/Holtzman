#!/usr/bin/env sh

# force script to error out at first error
set -e
# trace execution of commands
set -x

cd apollos

npm install
npm run lint
