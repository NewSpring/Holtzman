var doneCallback, resetPassword, extend = function (child, parent) {
    for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
},
    hasProp = {}.hasOwnProperty;

doneCallback = null;

Accounts.onResetPasswordLink(function (token, done) {
    Session.set("resetPasswordToken", token);
    return doneCallback = done;
});

resetPassword = (function (superClass) {
    extend(resetPassword, superClass);

    function resetPassword() {
        return resetPassword.__super__.constructor.apply(this, arguments);
    }

    resetPassword.register("resetPassword");

    resetPassword.prototype.vars = function () {
        return [{
            hasErrors: false
        }];
    };

    resetPassword.prototype["resetPasswordToken"] = function () {
        return Session.get("resetPasswordToken");
    };

    resetPassword.prototype.onRendered = function () {
        var sessionReset;
        return sessionReset = function () {};
    };

    resetPassword.prototype.events = function () {
        return [{
            "submit #reset-password": function (event) {
                var child, children, confirmPassword, i, len, password, ref, self, token;
                self = this;
                event.preventDefault();
                children = {};
                ref = self.children("Apollos.Forms.Input");
                for (i = 0, len = ref.length; i < len; i++) {
                    child = ref[i];
                    children[child.data().name] = child;
                }
                token = Session.get("resetPasswordToken");
                password = self.find("input[name=password]").value;
                confirmPassword = self.find("input[name=confirmPassword]").value;
                if (!password) {
                    self.hasErrors.set(true);
                    children["password"].setStatus("Password cannot be empty", true);
                    return;
                }
                if (!confirmPassword) {
                    self.hasErrors.set(true);
                    children["confirmPassword"].setStatus("Password cannot be empty", true);
                    return;
                }
                if (password !== confirmPassword) {
                    self.hasErrors.set(true);
                    children["confirmPassword"].setStatus("Passwords must match", true);
                    return;
                }
                return Apollos.user.resetPassword(token, password, function (error) {
                    if (error) {
                        self.hasErrors.set(true);
                        if (error.error === 403) {
                            return children["password"].setStatus("This reset link has expired", true);
                        }
                    } else {
                        Session.set("resetPasswordToken", "");
                        doneCallback();
                        return Router.go("home");
                    }
                });
            }
        }];
    };

    return resetPassword;

})(Apollos.Component);