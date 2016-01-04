"use strict";

exports.__esModule = true;

var _utilities = require("../utilities");

exports["default"] = _utilities.parseEndpoint("\n  FinancialAccounts?\n    $select=\n      Id,\n      IsActive,\n      EndDate,\n      Name,\n      PublicName,\n      Description,\n      PublicDescription,\n      IsPublic,\n      Order,\n      Url,\n      AccountTypeValueId\n    &$filter=\n      ParentAccountId eq null and\n      IsPublic eq true and\n      IsActive eq true and\n      Description ne null\n");
module.exports = exports["default"];