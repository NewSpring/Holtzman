"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp2;

var _react = require("react");

var _reactControllables = require("react-controllables");

var _reactControllables2 = _interopRequireDefault(_reactControllables);

var _function = require("react-pure-render/function");

var _function2 = _interopRequireDefault(_function);

var _utils = require("google-map-react/utils");

var _Marker = require("./components/Marker");

var _Marker2 = _interopRequireDefault(_Marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GoogleMap = void 0;
if (Meteor.isClient) {
  GoogleMap = require("google-map-react");
}

var K_MARGIN_TOP = 30;
var K_MARGIN_RIGHT = 30;
var K_MARGIN_BOTTOM = 30;
var K_MARGIN_LEFT = 30;

var K_HOVER_DISTANCE = 30;

var Map = (_dec = (0, _reactControllables2["default"])(["center", "zoom", "markers"]), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(Map, _Component);

  function Map() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Map);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2["default"], _this._onBoundsChange = function (center, zoom, bounds, marginBounds) {
      if (_this.props.onBoundsChange) {
        _this.props.onBoundsChange({ center: center, zoom: zoom, bounds: bounds, marginBounds: marginBounds });
      } else {
        _this.props.onCenterChange(center);
        _this.props.onZoomChange(zoom);
      }
    }, _this._onChildClick = function (key, childProps) {
      var markers = _this.props.markers;


      var marker = void 0;
      for (var _iterator = markers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _marker = _ref;

        if ("" + _marker.id === "" + key) {
          marker = _marker;
          break;
        }
      }

      if (_this.props.onChildClick) {
        _this.props.onChildClick(marker);
      }
    }, _this._onChildMouseEnter = function (key, childProps) {
      var markers = _this.props.markers;


      var marker = void 0;
      for (var _iterator2 = markers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _marker = _ref2;

        if ("" + _marker.id === "" + key) {
          marker = _marker;
          break;
        }
      }

      if (_this.props.onMarkerHover) {
        _this.props.onMarkerHover(marker);
      }
    }, _this._onChildMouseLeave = function () /* key, childProps */{
      if (_this.props.onMarkerHover) {
        _this.props.onMarkerHover(-1);
      }
    }, _this._onBalloonCloseClick = function () {
      if (_this.props.onChildClick) {
        _this.props.onChildClick(-1);
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Map.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {

    if (this.props.active === nextProps.active && this.props.hover === nextProps.hover) {
      if (nextProps.autoCenter && this.map) {

        var markers = this.props.markers.filter(function (x) {
          return x.latitude && x.longitude;
        }).map(function (marker) {
          return new google.maps.LatLng(marker.latitude, marker.longitude);
        });

        if (markers.length && markers.length > 1) {
          this.map.fitBounds(markers.reduce(function (bounds, marker) {
            return bounds.extend(marker);
          }, new google.maps.LatLngBounds()));
        }
      }
    }
  };

  Map.prototype.render = function render() {
    var _this2 = this;

    try {
      var dynamicProps = {};

      if (this.props.markers && this.props.markers.length === 1) {
        var center = this.props.markers[0];
        dynamicProps.center = [center.latitude, center.longitude];
      } else {
        dynamicProps.defaultCenter = [34.595413, -82.6241234];
      }

      if (typeof window != "undefined" && window != null) {
        return React.createElement(
          GoogleMap,
          (0, _extends3["default"])({}, dynamicProps, {
            zoom: this.props.zoom,
            options: this.props.options,
            onChange: this._onBoundsChange,
            onChildClick: this._onChildClick,
            onChildMouseEnter: this._onChildMouseEnter,
            onChildMouseLeave: this._onChildMouseLeave,
            distanceToMouse: this._distanceToMouse,
            margin: [K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT],
            hoverDistance: K_HOVER_DISTANCE,
            yesIWantToUseGoogleMapApiInternals: true,
            onGoogleApiLoaded: function onGoogleApiLoaded(_ref3) {
              var map = _ref3.map;
              var maps = _ref3.maps;

              _this2.map = map;
              var markers = _this2.props.markers.filter(function (x) {
                return x.latitude && x.longitude;
              }).map(function (marker) {
                return new google.maps.LatLng(marker.latitude, marker.longitude);
              });

              if (markers.length > 1) {
                _this2.map.fitBounds(markers.reduce(function (bounds, marker) {
                  return bounds.extend(marker);
                }, new google.maps.LatLngBounds()));
              }
            }
          }),
          this.props.markers.map(function (marker) {

            return React.createElement(_Marker2["default"], {
              lat: marker.latitude,
              lng: marker.longitude,
              key: marker.id
              // active={Number(this.props.active) === Number(marker.id)}
              , hover: Number(_this2.props.hover) === Number(marker.id),
              popUp: _this2.props.popUp
            });
          })
        );
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return Map;
}(_react.Component), _class2.propTypes = {
  onCenterChange: _react.PropTypes.func, // @controllable generated fn
  onZoomChange: _react.PropTypes.func, // @controllable generated fn
  onBoundsChange: _react.PropTypes.func,
  onMarkerHover: _react.PropTypes.func,
  onChildClick: _react.PropTypes.func,
  center: _react.PropTypes.any,
  zoom: _react.PropTypes.number,
  markers: _react.PropTypes.any,
  visibleRowFirst: _react.PropTypes.number,
  visibleRowLast: _react.PropTypes.number,
  maxVisibleRows: _react.PropTypes.number,
  hoveredRowIndex: _react.PropTypes.number,
  openBallonIndex: _react.PropTypes.number
}, _class2.defaultProps = {
  center: [34.595413, -82.6241234],
  zoom: 10,
  visibleRowFirst: -1,
  visibleRowLast: -1,
  hoveredRowIndex: -1,
  options: {
    minZoom: 4,
    maxZoom: 18,
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    disableDefaultUI: true
  }
}, _temp2)) || _class);
exports["default"] = Map;
module.exports = exports['default'];