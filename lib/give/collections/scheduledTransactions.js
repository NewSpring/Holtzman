"use strict";

exports.__esModule = true;
/*global Mongo */

var ScheduledTransactionReciepts = new Mongo.Collection("scheduledTransactionReciepts");

exports.ScheduledTransactionReciepts = ScheduledTransactionReciepts;