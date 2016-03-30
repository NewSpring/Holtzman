"use strict";

exports.__esModule = true;
/*global Mongo */

var TransactionReciepts = new Mongo.Collection("transactionReciepts");

exports.TransactionReciepts = TransactionReciepts;