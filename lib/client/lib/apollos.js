Template.registerHelper("Apollos", Apollos);

Template.registerHelper("currentPerson", Apollos.person);

Apollos.user.hasAccount = function (email, callback) {
    return Meteor.call("Apollos.user.hasAccount", email, callback);
};