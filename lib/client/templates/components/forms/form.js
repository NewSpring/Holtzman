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

Apollos.Forms.Form = (function (superClass) {
    extend(Form, superClass);

    function Form() {
        return Form.__super__.constructor.apply(this, arguments);
    }

    Form.register("Apollos.Forms.Form");

    Form.prototype.vars = function () {
        return [{
            hasErrors: false
        }];
    };

    Form.prototype.onRendered = function () {
        var grandparent, ref, ref1;
        grandparent = this.parent().parent();
        if ((ref = grandparent.title) != null) {
            ref.set(this.data().title);
        }
        if ((ref1 = grandparent.disabled) != null) {
            ref1.set(true);
        }
        return typeof grandparent.checkForValidated === "function" ? grandparent.checkForValidated() : void 0;
    };

    Form.prototype.paramaterize = function (string) {
        string = string.trim();
        string = string.replace(/[^a-zA-Z0-9-\s]/g, '');
        string = string.replace(/[^a-zA-Z0-9-]/g, '-');
        string = string.toLowerCase();
        return string;
    };

    return Form;

})(Apollos.Component);