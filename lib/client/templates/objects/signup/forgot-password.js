var ForgotPassword;

ForgotPassword = (function () {
    function ForgotPassword(template) {
        this.template = template;
    }

    return ForgotPassword;

})();

Template.forgotPassword.onCreated(function () {
    var parentLink, ref, self;
    self = this;
    self._ = new ForgotPassword(self);
    self.email = new ReactiveVar();
    if ((ref = self.data) != null ? ref.bind : void 0) {
        parentLink = self.data.bind.get();
        parentLink.methods = self._;
        self.data.bind.set(parentLink);
        if (parentLink.parent.email) {
            self.email = parentLink.parent.email.get();
        }
    }
    self.reset = new ReactiveVar(false);
    self.hasErrors = new ReactiveVar(false);
    return self.email = new ReactiveVar({
        methods: null,
        parent: self
    });
});

Template.forgotPassword.helpers({
    "hasErrors": function () {
        return Template.instance().hasErrors.get();
    },
    "email": function () {
        return Template.instance().email;
    },
    "sentEmail": function () {
        var email, emailTemplate;
        emailTemplate = Template.instance().email.get();
        if (emailTemplate != null ? emailTemplate.methods : void 0) {
            email = emailTemplate.methods.getValue();
            return email;
        }
    },
    "reset": function () {
        return Template.instance().reset.get();
    }
});

Template.forgotPassword.events({
    "click [data-forgot-password]": function (event, template) {
        var email, ref, templateLink;
        if ((ref = event.target.dataset) != null ? ref.forgotPassword : void 0) {
            templateLink = template.data.bind.get();
            email = template.email.get();
            if (email != null ? email.methods : void 0) {
                email = email.methods.getValue();
                templateLink.parent.email.set(email);
            }
            return templateLink.parent.passwordForget.set(false);
        }
    },
    "submit #forgot-password": function (event, template) {
        var email, emailTemplate;
        event.preventDefault();
        console.log("meowmeowmeowmeowmeowmeow");
        email = template.find("input[name=email]").value.toLowerCase();
        if (!Apollos.validate.isEmail(email)) {
            template.hasErrors.set(true);
            emailTemplate = template.email.get();
            emailTemplate.methods.setStatus(true);
            return;
        }
        console.log("meowmeowmeowmeowmeowmeow");
        Apollos.user.forgotPassword(email);
        template.reset.set(true);
    }
});

Template.forgotPassword.onRendered(function () {
    var email, emailTemplate, self, templateLink;
    self = this;
    templateLink = this.data.bind.get();
    if (email) {
        email = templateLink.parent.email.get();
    }
    if (emailTemplate) {
        emailTemplate = self.email.get();
        return emailTemplate.methods.setValue(email);
    }
});