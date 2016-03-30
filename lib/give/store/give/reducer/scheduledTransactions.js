"use strict";

exports.__esModule = true;
exports.deleteRecoverableSchedules = exports.setRecoverableSchedules = exports.deleteRecoverableSchedule = exports.setRecoverableSchedule = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setRecoverableSchedule = function setRecoverableSchedule(state, action) {
  return (0, _extends3["default"])({}, state, {
    scheduleToRecover: action.recoverableSchedule
  });
};

var deleteRecoverableSchedule = function deleteRecoverableSchedule(state, action) {
  return (0, _extends3["default"])({}, state, {
    scheduleToRecover: null
  });
};

var setRecoverableSchedules = function setRecoverableSchedules(state, action) {
  return (0, _extends3["default"])({}, state, {
    recoverableSchedules: action.recoverableSchedules
  });
};

var deleteRecoverableSchedules = function deleteRecoverableSchedules(state, action) {
  var id = action.id;


  var newState = (0, _extends3["default"])({}, state);

  if (newState.recoverableSchedules[id]) {
    delete newState.recoverableSchedules[id];
  }

  return newState;
};

exports.setRecoverableSchedule = setRecoverableSchedule;
exports.deleteRecoverableSchedule = deleteRecoverableSchedule;
exports.setRecoverableSchedules = setRecoverableSchedules;
exports.deleteRecoverableSchedules = deleteRecoverableSchedules;