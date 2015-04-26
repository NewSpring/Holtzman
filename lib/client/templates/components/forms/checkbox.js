var Checkbox, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Checkbox = (function () {
    function Checkbox(name, template) {
        this.setStatus = bind(this.setStatus, this);
        this.template = template;
        this.name = name;
    }

    Checkbox.prototype.validate = function (validateFunction) {
        return console.log(validateFunction);
    };

    Checkbox.prototype.setStatus = function (status, isError) {
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

    return Checkbox;

})();

Template.checkbox.onCreated(function () {
    var parentLink, self;
    self = this;
    self._ = new Checkbox(self.data.name, self);
    if (self.data.bind) {
        parentLink = self.data.bind.get();
        parentLink.methods = self._;
        self.data.bind.set(parentLink);
    }
    self.error = new ReactiveVar();
    self.status = new ReactiveVar();
    return self.value = new ReactiveVar();
});

Template.checkbox.helpers({
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

Template.checkbox.events({
    "click input": function (event, template) {
        template.value.set(event.target.value);
        template.error.set(false);
        return template.status.set(false);
    }
});