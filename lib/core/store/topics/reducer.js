"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Topic store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  topics: []
};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["TOPIC.TOGGLE"] = function TOPICTOGGLE(state, action) {
  var topic = action.props.topic;
  var previousTopics = state.topics;
  var nextTopics = _.contains(previousTopics, topic) ? _.without(previousTopics, topic) : _.union(previousTopics, [topic]);

  return (0, _extends3["default"])({}, state, {
    topics: nextTopics
  });
}, _createReducer["TOPIC.SET"] = function TOPICSET(state, action) {
  return (0, _extends3["default"])({}, state, {
    topics: action.content
  });
}, _createReducer));
module.exports = exports['default'];