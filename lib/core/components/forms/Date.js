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

var _react = require("react");

var _reactDayPicker = require("react-day-picker");

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

var _date = {};

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DateComponent = function (_Component) {
  (0, _inherits3["default"])(DateComponent, _Component);

  function DateComponent() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, DateComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      showDatePicker: false,
      selectedDay: null
    }, _this.fixPickerPosition = function () {
      var picker = document.getElementById("datepicker");
      if (picker) {
        var child = picker.children[0];
        var globalTop = Number(child.getBoundingClientRect().top);
        if (globalTop < 0) {
          var marginTop = Number(child.style.marginTop.slice(0, -2));
          child.style.marginTop = marginTop + Math.abs(globalTop) + "px";
        } else {
          child.style.marginTop = "-250px";
        }
      }
    }, _this.toggle = function (e) {
      _this.setState({
        showDatePicker: !_this.state.showDatePicker
      });
      setTimeout(function () {
        _this.fixPickerPosition();
      }, 200);
    }, _this.onDayClick = function (e, day, modifiers) {

      if (modifiers.indexOf("disabled") > -1) {
        return;
      }

      _this.setState({
        selectedDay: modifiers.indexOf("selected") > -1 ? null : day
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  DateComponent.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener("resize", this.fixPickerPosition);
  };

  DateComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("resize", this.fixPickerPosition);
  };

  DateComponent.prototype.render = function render() {
    var _this2 = this;

    var selectedDay = this.state.selectedDay;


    var WEEKDAYS_LONG = {
      "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    var MONTHS = {
      "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    var WEEKDAYS_SHORT = {
      "en": ["S", "M", "T", "W", "T", "F", "S"]
    };

    var localUtils = {
      formatMonthTitle: function formatMonthTitle(d, locale) {
        return MONTHS[locale][d.getMonth()] + " " + d.getFullYear();
      },
      formatWeekdayShort: function formatWeekdayShort(i, locale) {
        return WEEKDAYS_SHORT[locale][i];
      },
      formatWeekdayLong: function formatWeekdayLong(i, locale) {
        return WEEKDAYS_LONG[locale][i];
      },
      getFirstDayOfWeek: function getFirstDayOfWeek(locale) {
        return 0;
      }
    };

    var formattedDay = selectedDay && selectedDay.toLocaleDateString();
    if (this.props.format && selectedDay) {
      formattedDay = this.props.format(selectedDay);
    }

    if (!selectedDay && this.props.defaultValue) {
      formattedDay = this.props.format(this.props.defaultValue);
    }

    return React.createElement(
      "div",
      { className: "display-inline-block", style: { position: "relative" } },
      React.createElement(
        "div",
        { style: { position: "relative" } },
        React.createElement(_Input2["default"], (0, _extends3["default"])({}, this.props, {
          defaultValue: formattedDay,
          ref: "input"
        })),
        React.createElement("div", { className: "locked-ends locked-sides", onClick: this.toggle })
      ),
      function () {
        if (_this2.state.showDatePicker) {
          return React.createElement(
            "div",
            { id: "datepicker" },
            React.createElement(
              "div",
              { style: {
                  position: "absolute",
                  top: 0,
                  zIndex: 999,
                  margin: "0 auto",
                  left: 0,
                  right: 0,
                  maxWidth: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginTop: "-250px"
                } },
              React.createElement(_reactDayPicker2["default"], {
                locale: "en",
                localeUtils: localUtils,
                modifiers: {
                  selected: function selected(day) {
                    return _reactDayPicker.DateUtils.isSameDay(selectedDay, day);
                  },
                  disabled: function disabled(day) {
                    return _this2.props.past === false && _reactDayPicker.DateUtils.isPastDay(day) || _this2.props.today === false && _reactDayPicker.DateUtils.isSameDay(day, new Date());
                  }
                },
                onDayClick: _this2.onDayClick
              }),
              React.createElement(
                "div",
                { className: "background--light-secondary soft text-center" },
                React.createElement(
                  "button",
                  { className: "btn flush btn--small", onClick: _this2.toggle },
                  "Done"
                )
              )
            ),
            React.createElement("div", {
              style: {
                position: "fixed",
                top: 0,
                bottom: 0,
                zIndex: 998,
                backgroundColor: "rgba(0,0,0,.75)",
                left: 0,
                right: 0
              },
              onClick: _this2.toggle
            })
          );
        }
      }()
    );
  };

  return DateComponent;
}(_react.Component);

exports["default"] = DateComponent;
module.exports = exports['default'];