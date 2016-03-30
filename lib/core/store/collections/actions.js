"use strict";

exports.__esModule = true;

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  insert: function insert(collection, data) {
    return { type: _types2["default"].INSERT, collection: collection, data: data };
  },
  upsertBatch: function upsertBatch(collection, data, key) {
    return { type: _types2["default"].INSERT_BATCH, collection: collection, data: data, key: key };
  },
  remove: function remove(collection, data) {
    return { type: _types2["default"].REMOVE, collection: collection, data: data };
  },
  "delete": function _delete(collection, id) {
    return { type: _types2["default"].REMOVE, collection: collection, id: id };
  },
  clear: function clear(collection) {
    return { type: _types2["default"].CLEAR, collection: collection };
  }

};
module.exports = exports['default'];