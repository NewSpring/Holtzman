/* eslint-disable no-underscore-dangle */

global.Meteor = require("meteor/meteor");
global._ = require("underscore");
global.Moment = require("moment");

window.Meteor = { isServer: true };
window.Moment = global.Moment;

global.__meteor_runtime_config__ = true;

/* eslint-enable no-underscore-dangle */

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};
