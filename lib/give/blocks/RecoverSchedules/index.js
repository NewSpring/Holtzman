"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _modal = require("../../../core/store/modal");

var _modal2 = _interopRequireDefault(_modal);

var _give = require("../../store/give");

var _give2 = _interopRequireDefault(_give);

var _Later = require("./Later");

var _Later2 = _interopRequireDefault(_Later);

var _Remind = require("./Remind");

var _Remind2 = _interopRequireDefault(_Remind);

var _Recover = require("./Recover");

var _Recover2 = _interopRequireDefault(_Recover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(store) {
  return { give: store.give };
};
var RecoverSchedules = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(RecoverSchedules, _Component);

  function RecoverSchedules() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, RecoverSchedules);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      state: "default" }, _this.back = function (e) {
      e.preventDefault();

      _this.setState({ state: "default" });
    }, _this.onRemind = function (e) {
      e.preventDefault();

      var input = document.getElementById("remind-frequency");
      var value = input.value;

      var time = {
        tomorrow: (0, _moment2["default"])().add(1, "days").toDate(),
        nextWeek: (0, _moment2["default"])().add(7, "days").toDate(),
        twoWeeks: (0, _moment2["default"])().add(14, "days").toDate()
      };

      Meteor.users.update({ _id: Meteor.userId() }, {
        $set: {
          "profile.reminderDate": time[value]
        }
      }, function (err, result) {
        console.log(err, result);
      });

      _this.props.dispatch(_give2["default"].setReminder(time[value]));
      _this.props.dispatch(_give2["default"].clearData());
      _this.setState({ state: "later" });
    }, _this.close = function () {
      _this.props.dispatch(_modal2["default"].hide());
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  } // default, remind, later


  RecoverSchedules.prototype.render = function render() {
    var _this2 = this;

    var state = this.state.state;


    var arr = [];
    var _props$give = this.props.give;
    var recoverableSchedules = _props$give.recoverableSchedules;
    var reminderDate = _props$give.reminderDate;

    for (var schedule in recoverableSchedules) {
      arr.push(recoverableSchedules[schedule]);
    }

    if (state === "later") {
      return React.createElement(_Later2["default"], { date: reminderDate, onClick: this.close });
    }

    if (state === "remind") {
      return React.createElement(_Remind2["default"], {
        onSubmit: this.onRemind,
        onChange: this.onFrequencyChange,
        back: this.back
      });
    }

    return React.createElement(_Recover2["default"], {
      schedules: arr,
      hide: this.close,
      onClick: function onClick() {
        return _this2.setState({ state: "remind" });
      }
    });
  };

  return RecoverSchedules;
}(_react.Component)) || _class);
exports["default"] = RecoverSchedules;
module.exports = exports['default'];