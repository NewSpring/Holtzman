"use strict";

exports.__esModule = true;
exports.GraphQL = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lokka = require("lokka");

var _es6Promise = require("es6-promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LokkaTransport = function () {
  function LokkaTransport() {
    (0, _classCallCheck3["default"])(this, LokkaTransport);
  }

  LokkaTransport.prototype.send = function send(query, variables, operationName) {
    return this.call("graphql.transport", query, variables, operationName).then(function (_ref) {
      var data = _ref.data;
      var errors = _ref.errors;

      if (errors) {
        var message = errors[0].message;
        var error = new Meteor.Error(400, "GraphQL Error: " + message);
        error.rawError = errors;

        throw error;
      }

      return data;
    });
  };

  LokkaTransport.prototype.call = function call() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new _es6Promise.Promise(function (resolve, reject) {
      var _Meteor;

      (_Meteor = Meteor).call.apply(_Meteor, args.concat([function (error, result) {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }]));
    });
  };

  return LokkaTransport;
}();

var GraphQL = new _lokka.Lokka({ transport: new LokkaTransport() });

exports.GraphQL = GraphQL;