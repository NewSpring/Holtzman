var Input, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Input = (function () {
    function Input(name, template) {
        this.setValue = bind(this.setValue, this);
        this.getValue = bind(this.getValue, this);
        this.setStatus = bind(this.setStatus, this);
        this.template = template;
        this.name = name;
    }

    Input.prototype.validate = function (validateFunction) {
        return console.log(validateFunction);
    };

    Input.prototype.setStatus = function (status, isError) {
        if (!isError && typeof status === "boolean") {
            isError = status;
            if (isError) {
                status = this.template.data.errorText;
            } else {
                status = this.template.data.statusText;
            }
        }
        this.template.status.set(status);
        return this.template.error.set(isError);
    };

    Input.prototype.getValue = function () {
        return this.template.value.get();
    };

    Input.prototype.setValue = function (value) {
        this.template.value.set(value);
        if (value) {
            this.template.find("input").value = value;
        }
    };

    return Input;

})();

Template.input.onCreated(function () {
    var parentLink, self;
    self = this;
    self._ = new Input(self.data.name, self);
    if (self.data.bind) {
        parentLink = self.data.bind.get();
        parentLink.methods = self._;
        self.data.bind.set(parentLink);
    }
    self.error = new ReactiveVar();
    self.status = new ReactiveVar();
    return self.value = new ReactiveVar();
});

Template.input.helpers({
    "error": function () {
        return Template.instance().error.get();
    },
    "status": function () {
        return Template.instance().status.get();
    },
    "value": function () {
        return Template.instance().value.get();
    }
});

Template.input.events({
    "focus input": function (event, template) {
        return $(event.target.parentNode).addClass("input--active");
    },
    "blur input": function (event, template) {
        var valid, validateFunction;
        if (event.target.value && template.data.validate) {
            validateFunction = template.data.validate;
            valid = Apollos.validate[validateFunction](event.target.value);
            if (!valid) {
                template.error.set(true);
                template.status.set(template.data.errorText);
            }
        }
        if (!event.target.value) {
            return $(event.target.parentNode).removeClass("input--active");
        }
    },
    "focus input, keyup input, blur input": function (event, template) {
        return template.value.set(event.target.value);
    },
    "focus input, keyup input": function (event, template) {
        template.error.set(false);
        return template.status.set(false);
    }
});