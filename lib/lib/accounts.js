Apollos._loginMethods = {};

if (Meteor.isClient) {
    Apollos.loginWithPassword = function (username, password, callback) {
        var args, authenticated, baseLogin, handle, isAuthenticated, methods, self, service;
        self = this;
        isAuthenticated = false;
        args = Array.prototype.slice.call(arguments);
        baseLogin = function () {
            return Meteor.loginWithPassword.apply(Meteor.loginWithPassword, args);
        };
        methods = Apollos._loginMethods;
        if (!Object.keys(methods).length) {
            baseLogin();
        }
        for (service in methods) {
            handle = methods[service];
            authenticated = handle.apply(handle, args);
            if (authenticated === void 0) {
                continue;
            }
            if (authenticated === false) {
                isAuthenticated = true;
                continue;
            }
            if (authenticated === true) {
                isAuthenticated = true;
                baseLogin();
                break;
            }
        }
        if (!isAuthenticated) {
            baseLogin();
        }
    };
}

if (Meteor.isServer) {
    Meteor.methods({
        "Apollos.loginMethods": function () {
            console.log("returning methods...");
            console.log(Apollos._loginMethods);
            return Apollos._loginMethods;
        }
    });
}

Apollos.removeLogin = function (name) {
    if (Apollos._loginMethods[name]) {
        delete Apollos._loginMethods[name];
    }
};

Apollos.registerLogin = function (name, loginMethod) {
    var obj, self;
    self = this;
    if (Apollos._loginMethods[name]) {
        throw new Meteor.Error("registerLogin", "This method for logging in is already established");
    }
    if (Meteor.isServer) {
        Meteor.methods((
        obj = {}, obj["Apollos.login." + name] = loginMethod, obj));
        return;
    }
    if (Meteor.isClient) {
        Apollos._loginMethods[name] = function () {
            var args, call;
            args = Array.prototype.slice.call(arguments);
            call = ["Apollos.login." + name];
            call = call.concat(args);
            return Meteor.call.apply(Meteor.call, call);
        };
    }
};