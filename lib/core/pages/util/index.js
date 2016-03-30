"use strict";

exports.__esModule = true;

var _react = require("react");

var _graphql = require("../../graphql");

var _split = require("../../blocks/split");

var _split2 = _interopRequireDefault(_split);

var _resetPassword = require("./reset-password");

var _resetPassword2 = _interopRequireDefault(_resetPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Template = function Template(props) {

  var photo = "https://s3.amazonaws.com/ns.assets/apollos/leaves.png";
  return React.createElement(
    "div",
    null,
    React.createElement(
      _split2["default"],
      { nav: true, classes: ["background--light-primary"] },
      React.createElement(_split.Right, {
        mobile: false,
        background: photo,
        backgroundFill: false,
        classes: ["background--right", "background--bottom"]
      })
    ),
    React.createElement(
      _split.Left,
      { scroll: true, classes: ["background--light-primary"] },
      props.children
    )
  );
};

var Routes = [{
  path: "_",
  component: Template,
  childRoutes: [{ path: "reset-password/:token", component: _resetPassword2["default"] }]
}, {
  path: "/$*",
  onEnter: function onEnter(location, replaceState, callback) {

    var url = location.params.splat.replace(/\s+/g, "").toLowerCase();

    var _url$split = url.split("/");

    var fund = _url$split[0];
    var amount = _url$split[1];


    var compare = function compare(accounts) {
      for (var _iterator = accounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var account = _ref;

        var smallname = account.name.replace(/\s+/g, "").toLowerCase();

        var dest = "/give/campaign/" + account.name;

        if (amount) {
          dest += "?" + account.name + "=" + amount;
        }

        if (smallname === fund) {
          replaceState(null, dest);
          callback();
        }
      }
    };

    _graphql.GraphQL.query("\n        {\n          accounts: allFinancialAccounts(limit: 100, ttl: 8640) {\n            description\n            name\n            id\n            summary\n            image\n            order\n          }\n        }").then(function (_ref2) {
      var accounts = _ref2.accounts;

      if (accounts.length) {
        compare(accounts);
      }
    });
  }
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];