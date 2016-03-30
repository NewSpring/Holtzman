"use strict";

exports.__esModule = true;
// Likes
//
// TODO: fix apollos import

// import Apollos from "apollos/core/lib";

var Likes = new Mongo.Collection("likes");

// Likes.schema = {
//   userId: String,
//   entryId: String,
//   title: String,
//   image: String,
//   link: String,
//   icon: String,
//   category: String,
//   date: Date
//   status: String,
//   dateLiked: Date
// }

// Apollos.addSchema("likes", Likes.schema);

Likes.allow({
  "insert": function insert(userId, doc) {
    return userId === doc.userId;
  },
  "remove": function remove(userId, doc) {
    return userId === doc.userId;
  }
});

exports["default"] = Likes;
module.exports = exports['default'];