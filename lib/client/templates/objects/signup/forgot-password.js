var forgotPassword, extend = function (child, parent) {
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

forgotPassword = (function (superClass) {
    extend(forgotPassword, superClass);

    function forgotPassword() {
        return forgotPassword.__super__.constructor.apply(this, arguments);
    }

    forgotPassword.register("forgotPassword");

    forgotPassword.prototype.vars = function () {
        return [{
            hasErrors: false,
            sentEmail: "",
            reset: false
        }];
    };

    forgotPassword.prototype.events = function () {
        return [{
            "click [data-forgot-password]": function (event) {
                var parent, self;
                self = this;
                parent = this.parent();
                return parent.passwordForget.set(false);
            },
            "submit #forgot-password": function (event) {
                var child, children, email, i, len, ref, self;
                event.preventDefault();
                self = this;
                children = {};
                ref = self.children("Apollos.Forms.Input");
                for (i = 0, len = ref.length; i < len; i++) {
                    child = ref[i];
                    children[child.data().name] = child;
                }
                email = self.find("input[name=email]").value.toLowerCase();
                if (!Apollos.validate.isEmail(email)) {
                    children["email"].setStatus(true);
                    return;
                }
                self.parent().email.set(email);
                Apollos.user.forgotPassword(email);
                self.reset.set(true);
            }
        }];
    };

    return forgotPassword;

})(Apollos.Component);