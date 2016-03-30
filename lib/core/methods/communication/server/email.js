"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toPascalCase = require("to-pascal-case");

var _toPascalCase2 = _interopRequireDefault(_toPascalCase);

var _toSnakeCase = require("to-snake-case");

var _toSnakeCase2 = _interopRequireDefault(_toSnakeCase);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rock = require("../../../util/rock");

var _util = require("../../../util");

var _liquidNode = require("liquid-node");

var _liquidNode2 = _interopRequireDefault(_liquidNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor, check */

var Parser = new _liquidNode2["default"].Engine();

// @TODO abstract


var StandardFilters = (0, _extends3["default"])({}, _liquidNode2["default"].StandardFilters);
var caseChangedFilter = {};

var _loop = function _loop(filter) {
  var newFilter = (0, _toPascalCase2["default"])(filter);

  caseChangedFilter[newFilter] = function (input, format) {
    input = (0, _toSnakeCase2["default"])(input);

    return StandardFilters[filter](input, format);
  };
};

for (var filter in StandardFilters) {
  _loop(filter);
}

function toDate(input) {
  if (input == null) {
    return;
  }
  if (input instanceof Date) {
    return input;
  }
  if (input === "now" || input === "Now") {
    return new Date();
  }
  if (isNumber(input)) {
    input = parseInt(input);
  } else {
    input = toString(input);
    if (input.length === 0) {
      return;
    }
    input = Date.parse(input);
  }
  if (input != null) {
    return new Date(input);
  }
};

Parser.registerFilters((0, _extends3["default"])({}, caseChangedFilter, {
  Attribute: function Attribute(variable, key) {

    if (variable === "Global") {
      var global = this.context.findVariable("GlobalAttribute");
      return global.then(function (response) {
        return response[key];
      });
    }
  },
  Format: function Format(value, format) {

    // hardcode number formating for now
    if (format === "#,##0.00") {
      value = Number(value).toFixed(2);

      return ("" + value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  Date: function Date(input, format) {
    // console.log(this)
    input = toDate(input);

    if (input == null) {
      return "";
    } else if (toString(format).length === 0) {
      return input.toUTCString();
    } else {
      format = format.replace(/y/gmi, "Y");
      return (0, _moment2["default"])(input).format(format);
    }

    // return Liquid.StandardFilters.date(input, format.toLowerCase())
  }
}));

Meteor.methods({
  "communication/email/send": function communicationEmailSend(emailId, PersonAliasId, mergeFields) {
    check(emailId, Number);
    // check(PersonAliasId, Number)

    var Email = _rock.api.get.sync("SystemEmails/" + emailId);

    if (!Email.Body || !Email.Subject) {
      throw new Meteor.Error("No email body or subject found for " + emailId);
    }

    /*
       Get global attributes from Rock and map to JSON
       @TODO depreciate for MergeFieldsJson
     */
    var GlobalAttribute = {};
    var Globals = _rock.api.get.sync("AttributeValues?$filter=Attribute/EntityTypeId eq null&$expand=Attribute&$select=Attribute/Key,Value");
    var Defaults = _rock.api.get.sync("Attributes?$filter=EntityTypeId eq null&$select=DefaultValue,Key");

    for (var _iterator = Defaults, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var d = _ref;
      GlobalAttribute[d.Key] = d.DefaultValue;
    }
    for (var _iterator2 = Globals, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var g = _ref2;
      GlobalAttribute[g.Attribute.Key] = g.Value;
    }
    mergeFields = (0, _extends3["default"])({}, mergeFields, { GlobalAttribute: GlobalAttribute });

    return Promise.all([
    // Parser.parse(Email.Subject)
    //   .then((template) => {
    //     // console.log(template)
    //     return template.render(mergeFields)
    //   }),
    // Parser.parse(Email.Body)
    //   .then((template) => {
    //     console.log(template.root.nodelist)
    //     return template.render(mergeFields)
    //   }),
    Parser.parseAndRender(Email.Subject, mergeFields), Parser.parseAndRender(Email.Body, mergeFields)]).then(function (_ref3) {
      var subject = _ref3[0];
      var body = _ref3[1];


      var Communication = {
        SenderPersonAliasId: null,
        Status: 3,
        IsBulkCommunication: false,
        Guid: (0, _util.makeNewGuid)(),
        Subject: subject,
        MediumData: {
          HtmlMessage: body
        }
      };

      return _rock.api.post("Communications", Communication);
    }).then(function (CommunicationId) {

      if (CommunicationId.statusText) {
        throw new Meteor.Error(CommunicationId);
      }

      // this is a bug in core right now. We can't set Mandrill on the initial
      // post because it locks everything up, we can however, patch it
      _rock.api.patch.sync("Communications/" + CommunicationId, {
        MediumEntityTypeId: 37 // Mandrill
      });

      if (typeof PersonAliasId === "number") {
        PersonAliasId = [PersonAliasId];
      }

      var ids = [];
      for (var _iterator3 = PersonAliasId, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var id = _ref4;

        var CommunicationRecipient = {
          PersonAliasId: id,
          CommunicationId: CommunicationId,
          Status: 0, // Pending
          Guid: (0, _util.makeNewGuid)()
        };

        var CommunicationRecipientId = _rock.api.post.sync("CommunicationRecipients", CommunicationRecipient);

        ids.push(CommunicationRecipientId);
      }

      return ids;
    }).then(function (communications) {

      for (var _iterator4 = communications, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref5 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref5 = _i4.value;
        }

        var CommunicationRecipientId = _ref5;

        if (CommunicationRecipientId.statusText) {
          throw new Meteor.Error(CommunicationRecipientId);
        }
      }

      return communications;
    })["catch"](function (e) {
      console.log(e);
      throw e;
    });
  }
});