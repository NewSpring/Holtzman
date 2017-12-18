Meteor.methods({
  "communication/slack/send": function sendSlack(text, room) {
    if (!Meteor.settings.slack || !text) return Promise.resolve();

    const message = {
      username: "Apollos",
      icon_emoji: ":newspring:",
      text,
    };

    if (room) message.channel = room;

    // eslint-disable-next-line
    return fetch(Meteor.settings.slack, {
      method: "POST",
      body: JSON.stringify(message),
    });
  },
});
