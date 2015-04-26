Apollos.user.login.f1 = function (username, password, callback) {
    return Meteor.call("Apollos.user.login.f1", username, password, callback);
};

Apollos.user.login.ldap = function (username, password, callback) {
    return Meteor.call("Apollos.user.login.ldap", username, password, callback);
};

Apollos.user.getAccountType = function (email, callback) {
    return Meteor.call("Apollos.user.getAccountType", email, callback);
};