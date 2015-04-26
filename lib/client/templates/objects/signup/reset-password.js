var doneCallback;

doneCallback = null;

Accounts.onResetPasswordLink(function (token, done) {
    Session.set("resetPasswordToken", token);
    return doneCallback = done;
});

Template.resetPassword.onCreated(function () {
    var self;
    self = this;
    self.hasErrors = new ReactiveVar(false);
    self.password = new ReactiveVar({
        methods: null,
        parent: self
    });
    return self.confirmPassword = new ReactiveVar({
        methods: null,
        parent: self
    });
});

Template.resetPassword.helpers({
    "hasErrors": function () {
        return Template.instance().hasErrors.get();
    },
    "resetPasswordToken": function () {
        return Session.get("resetPasswordToken");
    },
    "password": function () {
        return Template.instance().password;
    },
    "confirmPassword": function () {
        return Template.instance().confirmPassword;
    }
});

Template.resetPassword.onRendered(function () {
    var sessionReset;
    return sessionReset = function () {};
});

Template.resetPassword.events({
    "focus input": function (event, template) {
        return template.hasErrors.set(false);
    },
    "submit #reset-password": function (event, template) {
        var confirmPassword, confirmPasswordTemplate, password, passwordTemplate, token;
        event.preventDefault();
        token = Session.get("resetPasswordToken");
        password = template.find("input[name=password]").value;
        confirmPassword = template.find("input[name=confirmPassword]").value;
        if (!password) {
            template.hasErrors.set(true);
            passwordTemplate = template.password.get();
            passwordTemplate.methods.setStatus("Password cannot be empty", true);
            return;
        } else if (!confirmPassword) {
            template.hasErrors.set(true);
            confirmPasswordTemplate = template.confirmPassword.get();
            confirmPasswordTemplate.methods.setStatus("Password cannot be empty", true);
            return;
        } else if (password !== confirmPassword) {
            template.hasErrors.set(true);
            confirmPasswordTemplate = template.confirmPassword.get();
            confirmPasswordTemplate.methods.setStatus("Passwords must match", true);
            return;
        }
        return Apollos.user.resetPassword(token, password, function (error) {
            if (error) {
                template.hasErrors.set(true);
                if (error.error === 403) {
                    passwordTemplate = template.password.get();
                    return passwordTemplate.methods.setStatus("This reset link has expired", true);
                }
            } else {
                Session.set("resetPasswordToken", "");
                doneCallback();
                return Router.go("home");
            }
        });
    }
});