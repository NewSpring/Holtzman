"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Liked store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  likes: []
};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["LIKED.TOGGLE"] = function LIKEDTOGGLE(state, action) {
  var entryId = action.props.entryId;
  var previousLikes = state.likes;
  var nextLikes = _.contains(previousLikes, entryId) ? _.without(previousLikes, entryId) : _.union(previousLikes, [entryId]);

  return (0, _extends3["default"])({}, state, {
    likes: nextLikes
  });
}, _createReducer["LIKED.SET"] = function LIKEDSET(state, action) {
  return (0, _extends3["default"])({}, state, {
    likes: action.content
  });
}, _createReducer));
module.exports = exports['default'];