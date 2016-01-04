"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _coreClientComponents = require("../../../../core/client/components");

var Campaigns = (function (_Component) {
  _inherits(Campaigns, _Component);

  function Campaigns() {
    _classCallCheck(this, Campaigns);

    _Component.apply(this, arguments);
  }

  Campaigns.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("accounts");
    var accounts = Accounts.find().fetch();
    return {
      accounts: accounts
    };
  };

  Campaigns.prototype.render = function render() {};

  return Campaigns;
})(_react.Component);

exports["default"] = Campaigns;
module.exports = exports["default"];