'use strict';

exports.__esModule = true;
exports['default'] = RouteTransition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function RouteTransition(_ref) {
  var children = _ref.children;
  var pathname = _ref.pathname;


  var farLeft = -20;
  var farRight = 20;

  var lastPart = function lastPart() {
    var pathParts = pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  var getDirection = function getDirection(action, pathname) {

    var isNum = Number(lastPart()) > 0;

    if (action === "enter") {
      return isNum ? (0, _reactMotion.spring)(farRight, _reactMotion.presets.stiff) : (0, _reactMotion.spring)(farLeft, _reactMotion.presets.stiff);
    } else if (action === "leave") {
      return isNum ? (0, _reactMotion.spring)(farLeft, _reactMotion.presets.stiff) : (0, _reactMotion.spring)(farRight, _reactMotion.presets.stiff);
    }
  };

  var willEnter = function willEnter(children) {
    return {
      children: children,
      opacity: (0, _reactMotion.spring)(0),
      translate: getDirection("enter", pathname)
    };
  };

  var willLeave = function willLeave(key, _ref2) {
    var children = _ref2.children;

    return {
      children: children,
      opacity: (0, _reactMotion.spring)(0),
      translate: getDirection("leave", pathname)
    };
  };

  var getStyles = function getStyles(children, pathname) {
    var _ref3;

    return _ref3 = {}, _ref3[pathname] = {
      children: children,
      opacity: (0, _reactMotion.spring)(1),
      translate: (0, _reactMotion.spring)(0)
    }, _ref3;
  };

  return _react2['default'].createElement(
    _reactMotion.TransitionMotion,
    {
      styles: getStyles(children, pathname),
      willEnter: willEnter,
      willLeave: willLeave
    },
    function (interpolated) {
      return _react2['default'].createElement(
        'div',
        null,
        Object.keys(interpolated).map(function (key) {
          return _react2['default'].createElement(
            'div',
            {
              key: key + '-transition',
              style: {
                WebkitBackfaceVisibility: "hidden",
                WebkitPerspective: 1000,
                position: "absolute",
                width: "100%",
                minHeight: "100%",
                paddingBottom: "60px",
                opacity: interpolated[key].opacity,
                transform: 'translate3d(' + interpolated[key].translate + '%, 0, 0)'
              }
            },
            interpolated[key].children
          );
        })
      );
    }
  );
}
module.exports = exports['default'];