var extend = function (child, parent) {
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

profile.signUp = (function (superClass) {
    extend(signUp, superClass);

    function signUp() {
        return signUp.__super__.constructor.apply(this, arguments);
    }

    signUp.register("profile.signUp");

    signUp.card("Apollos.profile.onBoard");

    signUp.prototype.url = "sign-up";

    signUp.prototype.vars = function () {
        return [{
            hasAccount: true,
            hasErrors: false,
            showForgotPassword: false
        }];
    };

    signUp.prototype.events = function () {
        return [{
            "click [data-form]": this.toggleForm,
            "blur input[name=password]": function (event) {
                return this.showForgotPassword.set(false);
            },
            "blur input[name=email]": this.validateEmail,
            "submit #signin": this.signin,
            "submit #signup": this.signup,
            "click [data-forgot-password]": function (event) {
                var child, children, data, email, i, len, parent, ref, ref1, self;
                self = this;
                children = {};
                ref = self.children();
                for (i = 0, len = ref.length; i < len; i++) {
                    child = ref[i];
                    data = child.data();
                    if (!data.name) {
                        continue;
                    }
                    children[data.name] = child;
                }
                if ((ref1 = event.target.dataset) != null ? ref1.forgotPassword : void 0) {
                    email = children["email"].getValue();
                    parent = self.parent();
                    if (email) {
                        parent.email.set(email);
                    }
                    return parent.passwordForget.set(true);
                }
            }
        }];
    };

    signUp.prototype.toggleForm = function (event) {
        var ref, ref1, self;
        self = this;
        if (((ref = event.target.dataset) != null ? ref.form : void 0) === "signin") {
            self.hasAccount.set(true);
        }
        if (((ref1 = event.target.dataset) != null ? ref1.form : void 0) === "signup") {
            return self.hasAccount.set(false);
        }
    };

    signUp.prototype.validateEmail = function (event) {
        var email, self;
        self = this;
        email = event.target.value.toLowerCase();
        if (!email) {
            self.hasErrors.set(false);
            return;
        }
        if (!Apollos.validate.isEmail(email)) {
            self.hasErrors.set(true);
        }
        return Apollos.user.hasAccount(email, function (error, hasAccount) {
            if (error) {
                Apollos.debug("ERROR: " + error);
            }
            return self.hasAccount.set(hasAccount);
        });
    };

    signUp.prototype.login = function (email, password) {
        var child, children, i, len, ref, self;
        self = this;
        children = {};
        ref = self.children("Apollos.Forms.Input");
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            children[child.data().name] = child;
        }
        Apollos.loginWithPassword(email, password, function (err) {
            if (!err) {
                self.signinAnimation();
                return;
            }
            if (err.error === 403) {
                children["password"].setStatus("Password incorrect", true);
                self.showForgotPassword.set(true);
            }
            if (err.error === 400) {
                return children["email"].setStatus("That email is already taken", true);
            }
        });
    };

    signUp.prototype.signin = function (event) {
        var child, children, email, i, len, password, ref, self;
        self = this;
        event.preventDefault();
        children = {};
        ref = self.children("Apollos.Forms.Input");
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            children[child.data().name] = child;
        }
        email = self.find("input[name=email]").value.toLowerCase();
        password = self.find("input[name=password]").value;
        if (!Apollos.validate.isEmail(email)) {
            children["email"].setStatus(true);
            return;
        }
        if (!password) {
            children["password"].setStatus("Password cannot be empty", true);
            return;
        }
        return self.login(email, password);
    };

    signUp.prototype.createAccount = function (email, password) {
        var child, children, i, len, ref, self;
        self = this;
        children = {};
        ref = self.children("Apollos.Forms.Input");
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            children[child.data().name] = child;
        }
        return Apollos.user.create(email, password, function (error) {
            if (!error) {
                self.signinAnimation();
                return;
            }
            children["password"].setStatus("Password incorrect", true);
            self.showForgotPassword.set(true);
        });
    };

    signUp.prototype.signup = function (event) {
        var child, children, data, email, i, len, password, ref, self, terms;
        self = this;
        event.preventDefault();
        children = {};
        ref = self.children();
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            data = child.data();
            if (!data.name) {
                continue;
            }
            children[data.name] = child;
        }
        email = self.find("input[name=email]").value.toLowerCase();
        password = self.find("input[name=password]").value;
        terms = self.find("input[name=terms]").checked;
        if (!Apollos.validate.isEmail(email)) {
            self.hasErrors.set(true);
            children["email"].setStatus(true);
            return;
        }
        if (!password) {
            self.hasErrors.set(true);
            children["password"].setStatus("Password cannot be empty", true);
            return;
        }
        if (!terms) {
            self.hasErrors.set(true);
            children["password"].setStatus("You must accept the terms and conditions", true);
            return;
        }
        return Apollos.user.hasAccount(email, function (error, hasAccount) {
            if (error) {
                Apollos.debug("ERROR: " + error);
            }
            if (hasAccount) {
                return self.login(email, password);
            } else {
                return self.createAccount(email, password);
            }
        });
    };

    return signUp;

})(Apollos.Component);