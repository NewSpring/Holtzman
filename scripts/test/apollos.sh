#!/usr/bin/env sh

# force script to error out at first error
set -e

cd apollos

npm install
npm run lint
