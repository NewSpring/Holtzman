"use strict";

var _collections = require("../collections");

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("likes", function () {
    return _collections.Likes.find({
      userId: this.userId
    }, {
      sort: {
        dateLiked: -1
      }
    });
  });

  Meteor.publish("recently-liked", function () {
    return _collections.Likes.find({
      // userId: {
      //   $not: this.userId
      // }
    }, {
      sort: {
        dateLiked: -1
      },
      limit: 15
    });
  });
}