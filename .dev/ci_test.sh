#!/usr/bin/env sh

# since coverage takes so long, only chron jobs run with coverage
if [ "$TRAVIS_EVENT_TYPE" = "chron" ]; then
  npm test -- --coverage
  coveralls < ./.coverage/lcov.info || true
else
  npm test
fi
