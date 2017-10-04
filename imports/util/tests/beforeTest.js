/* eslint-disable no-underscore-dangle */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

global.Meteor = require("meteor/meteor");
global._ = require("underscore");
global.Moment = require("moment");

window.Meteor = { isServer: true };
window.Moment = global.Moment;

global.__meteor_runtime_config__ = true;

// Not the best idea but needed until I can find
// out what is causing the prop-types warning
console.warn = function() {}; // eslint-disable-line

/* eslint-enable no-underscore-dangle */

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};
