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

Apollos.Forms.Input = (function (superClass) {
    extend(Input, superClass);

    function Input() {
        return Input.__super__.constructor.apply(this, arguments);
    }

    Input.register("Apollos.Forms.Input");

    Input.prototype.vars = function () {
        return [{
            error: null,
            status: null,
            value: null
        }];
    };

    Input.prototype.events = function () {
        return [{
            "focus input": this.focused,
            "blur input": this.blurred,
            "focus input, keyup input, blur input": this.changed,
            "focus input, keyup input": this.active
        }];
    };

    Input.prototype.onRendered = function () {
        var self;
        self = this;
        return self.autorun(function () {
            var ref;
            if ((ref = self.data()) != null ? ref.preFill : void 0) {
                return self.value.set(self.data().preFill);
            }
        });
    };

    Input.prototype.focused = function (event) {
        var parent, self;
        self = this;
        $(event.target.parentNode).addClass("input--active");
        parent = self.parent();
        if (parent.find("form")) {
            return parent.hasErrors.set(false);
        }
    };

    Input.prototype.blurred = function (event) {
        var data, isForm, parent, self, valid, validateFunction;
        self = this;
        parent = self.parent();
        isForm = parent.find("form");
        data = self.data();
        if (event.target.value && data.validate) {
            validateFunction = data.validate;
            valid = Apollos.validate[validateFunction](event.target.value);
            if (!valid) {
                self.error.set(true);
                self.status.set(data.errorText);
                if (isForm) {
                    parent.hasErrors.set(true);
                }
            }
            return;
        }
        if (isForm) {
            parent.hasErrors.set(false);
        }
        if (!event.target.value) {
            return $(event.target.parentNode).removeClass("input--active");
        }
    };

    Input.prototype.changed = function (event) {
        var self;
        self = this;
        return self.value.set(event.target.value);
    };

    Input.prototype.active = function (event) {
        var self;
        self = this;
        self.error.set(false);
        return self.status.set(false);
    };

    Input.prototype.setStatus = function (status, isError) {
        var data, self;
        self = this;
        if (!isError && typeof status === "boolean") {
            isError = status;
            data = self.data();
            if (isError) {
                status = data.errorText;
            } else {
                status = data.statusText;
            }
        }
        self.status.set(status);
        return self.error.set(isError);
    };

    Input.prototype.getValue = function () {
        return this.value.get();
    };

    Input.prototype.setValue = function (value) {
        this.value.set(value);
        if (value) {
            this.find("input").value = value;
        }
    };

    return Input;

})(Apollos.Component);