

Meteor.methods({
  "communication/slack/send": function (text, room) {
    if (!Meteor.settings.slack || !text) {
      return;
    }

    const message = {
      username: "Apollos",
      icon_emoji: ":newspring:",
      text,
    };

    if (room) {
      message.channel = room;
    }
    return fetch(Meteor.settings.slack, {
      method: "POST",
      body: JSON.stringify(message),
    });
  },
});
