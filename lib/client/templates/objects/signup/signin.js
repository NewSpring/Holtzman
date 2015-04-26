var Signin, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Signin = (function () {
    function Signin(template) {
        this.createAccountFromF1 = bind(this.createAccountFromF1, this);
        this.createAccount = bind(this.createAccount, this);
        this.login = bind(this.login, this);
        this.template = template;
    }

    Signin.prototype.login = function (email, password) {
        var self, template;
        self = this;
        template = self.template;
        Meteor.loginWithPassword(email, password, function (err) {
            var emailTemplate, passwordTemplate;
            if (!err) {
                return;
            }
            if (err.error === 403) {
                passwordTemplate = template.password.get();
                passwordTemplate.methods.setStatus("Password incorrect", true);
                template.showForgotPassword.set(true);
            }
            if (err.error === 400) {
                emailTemplate = template.email.get();
                return emailTemplate.methods.setStatus("That email is already taken", true);
            }
        });
    };

    Signin.prototype.createAccount = function (email, password) {
        var self, template;
        self = this;
        template = self.template;
        return Apollos.user.create(email, password, function (error) {
            var passwordTemplate;
            if (!error) {
                return;
            }
            debug(error);
            passwordTemplate = template.password.get();
            passwordTemplate.methods.setStatus("Password incorrect", true);
            template.showForgotPassword.set(true);
        });
    };

    Signin.prototype.createAccountFromF1 = function (email, password) {
        var self, template;
        self = this;
        template = self.template;
        return Apollos.user.login.f1(email, password, function (error, success) {
            var passwordTemplate;
            if (error) {
                debug("ERROR: " + error);
                passwordTemplate = template.password.get();
                passwordTemplate.methods.setStatus("Password incorrect", true);
                template.showForgotPassword.set(true);
                return;
            }
            if (success) {
                self.createAccount(email, password);
            }
        });
    };

    return Signin;

})();

Template.signin.onCreated(function () {
    var parentLink, ref, self;
    self = this;
    self._ = new Signin(self);
    if ((ref = self.data) != null ? ref.bind : void 0) {
        parentLink = self.data.bind.get();
        parentLink.methods = self._;
        self.data.bind.set(parentLink);
    }
    self.hasAccount = new ReactiveVar(true);
    self.hasErrors = new ReactiveVar(false);
    self.showForgotPassword = new ReactiveVar(false);
    self.email = new ReactiveVar({
        methods: null,
        parent: self
    });
    self.password = new ReactiveVar({
        methods: null,
        parent: self
    });
    return self.terms = new ReactiveVar({
        methods: null,
        parent: self
    });
});

Template.signin.helpers({
    "hasAccount": function () {
        return Template.instance().hasAccount.get();
    },
    "hasErrors": function () {
        return Template.instance().hasErrors.get();
    },
    "showForgotPassword": function () {
        return Template.instance().showForgotPassword.get();
    },
    "email": function () {
        return Template.instance().email;
    },
    "password": function () {
        return Template.instance().password;
    },
    "terms": function () {
        return Template.instance().terms;
    }
});

Template.signin.events({
    "click [data-form]": function (event, template) {
        var ref, ref1;
        if (((ref = event.target.dataset) != null ? ref.form : void 0) === "signin") {
            template.hasAccount.set(true);
        }
        if (((ref1 = event.target.dataset) != null ? ref1.form : void 0) === "signup") {
            return template.hasAccount.set(false);
        }
    },
    "blur input[name=password]": function (event, template) {
        return template.showForgotPassword.set(false);
    },
    "blur input[name=email]": function (event, template) {
        var email;
        email = event.target.value.toLowerCase();
        if (!Apollos.validate.isEmail(email)) {
            template.hasErrors.set(true);
        }
        return Apollos.user.getAccountType(email, function (error, accountType) {
            var types;
            if (error) {
                debug("ERROR: " + error);
            }
            types = Apollos.enums.accountType;
            switch (accountType) {
            case types.apollos:
            case types.f1:
            case types.ldap:
                return template.hasAccount.set(true);
            default:
                return template.hasAccount.set(false);
            }
        });
    },
    "submit #signin": function (event, template) {
        var email, emailTemplate, password, passwordTemplate;
        event.preventDefault();
        email = template.find("input[name=email]").value.toLowerCase();
        password = template.find("input[name=password]").value;
        if (!Apollos.validate.isEmail(email)) {
            emailTemplate = template.email.get();
            emailTemplate.methods.setStatus(true);
            return;
        }
        if (!password) {
            passwordTemplate = template.password.get();
            passwordTemplate.methods.setStatus("Password cannot be empty", true);
            return;
        }
        return Apollos.user.getAccountType(email, function (error, accountType) {
            var types;
            if (error) {
                debug("ERROR: " + error);
            }
            types = Apollos.enums.accountType;
            switch (accountType) {
            case types.apollos:
            case types.ldap:
                return template._.login(email, password);
            case types.f1:
                return template._.createAccountFromF1(email, password, template);
            default:
                return template.hasAccount.set(false);
            }
        });
    },
    "submit #signup": function (event, template) {
        var email, emailTemplate, password, passwordTemplate, terms, termsTemplate;
        event.preventDefault();
        email = template.find("input[name=email]").value.toLowerCase();
        password = template.find("input[name=password]").value;
        terms = template.find("input[name=terms]").checked;
        if (!Apollos.validate.isEmail(email)) {
            template.hasErrors.set(true);
            emailTemplate = template.email.get();
            emailTemplate.methods.setStatus(true);
            return;
        }
        if (!Apollos.validate.isEmail(email)) {
            template.hasErrors.set(true);
            emailTemplate = template.email.get();
            emailTemplate.methods.setStatus(true);
            return;
        }
        if (!password) {
            template.hasErrors.set(true);
            passwordTemplate = template.password.get();
            passwordTemplate.methods.setStatus("Password cannot be empty", true);
            return;
        }
        if (!terms) {
            template.hasErrors.set(true);
            termsTemplate = template.terms.get();
            termsTemplate.methods.setStatus("You must accept the terms and conditions", true);
            return;
        }
        return Apollos.user.getAccountType(email, function (error, accountType) {
            var types;
            if (error) {
                debug("ERROR: " + error);
            }
            types = Apollos.enums.accountType;
            switch (accountType) {
            case types.apollos:
            case types.f1:
            case types.ldap:
                template._.login(email, password);
                return template.hasAccount.set(true);
            default:
                return template._.createAccount(email, password);
            }
        });
    },
    "click [data-forgot-password]": function (event, template) {
        var email, ref, templateLink;
        if ((ref = event.target.dataset) != null ? ref.forgotPassword : void 0) {
            templateLink = template.data.bind.get();
            email = template.email.get();
            email = email.methods.getValue();
            templateLink.parent.email.set(email);
            return templateLink.parent.passwordForget.set(true);
        }
    }
});