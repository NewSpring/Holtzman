"use strict";

Meteor.methods({
  "communication/slack/send": function communicationSlackSend(text, room) {

    if (!Meteor.settings.slack || !text) {
      return;
    }

    var message = {
      username: "Apollos",
      icon_emoji: ":newspring:",
      text: text
    };

    if (room) {
      message.channel = room;
    }
    return fetch(Meteor.settings.slack, {
      method: "POST",
      body: JSON.stringify(message)
    });
  }
});