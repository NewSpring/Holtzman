"use strict";

exports.__esModule = true;
/*

  This is a rudimentary attempt at an in memory session
  for users conncted. The primary use case is for creating sessions
  to be used in page tracking with Rock

  {
    "IpAddress": String,
    "Guid": Guid,
  }
*/

var sessions = void 0;
if (Meteor.isServer) {

  sessions = new Mongo.Collection(null);

  // bind connection starts and ends
  Meteor.onConnection(function (connection) {

    var ip = connection.ip;

    if (connection.httpHeaders && connection.httpHeaders["x-forwarded-for"]) {
      ip = connection.httpHeaders["x-forwarded-for"];
    }

    // on a connection, insert the connection details
    sessions.insert({
      _id: connection.id,
      ip: ip,
      userId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, function (err, id) {

      connection.onClose(function () {
        sessions.remove(id);
      });
    });
  });

  // Dummy publish for this.userId
  Meteor.publish("apollos-session-dummy", function () {

    sessions.update(this.connection.id, {
      $set: {
        userId: this.userId,
        updatedAt: new Date()
      }
      // async
    }, function (err, update) {});

    return [];
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("apollos-session-dummy");
}

exports["default"] = sessions;
module.exports = exports['default'];