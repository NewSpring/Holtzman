Apollos.user.hasAccount = function (email, callback) {
    return Meteor.call("Apollos.user.hasAccount", email, callback);
};

Apollos.Component = Component;