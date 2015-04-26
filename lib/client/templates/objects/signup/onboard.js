var OnBoard;

OnBoard = (function () {
    function OnBoard(template) {
        this.template = template;
    }

    return OnBoard;

})();

Template.onboard.onCreated(function () {
    var self;
    self = this;
    self._ = new OnBoard(self);
    self.passwordForget = new ReactiveVar(false);
    self.email = new ReactiveVar();
    self.signin = new ReactiveVar({
        methods: null,
        parent: self
    });
    return self.forgotPassword = new ReactiveVar({
        methods: null,
        parent: self
    });
});

Template.onboard.helpers({
    "passwordForget": function () {
        return Template.instance().passwordForget.get();
    },
    "resetPasswordToken": function () {
        return Session.get("resetPasswordToken");
    },
    "signinLink": function () {
        return Template.instance().signin;
    },
    "passwordForgetLink": function () {
        return Template.instance().forgotPassword;
    }
});