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

Apollos.Forms.Checkbox = (function (superClass) {
    extend(Checkbox, superClass);

    function Checkbox() {
        return Checkbox.__super__.constructor.apply(this, arguments);
    }

    Checkbox.register("Apollos.Forms.Checkbox");

    Checkbox.prototype.vars = function () {
        return [{
            error: "",
            status: "",
            value: ""
        }];
    };

    Checkbox.prototype.events = function () {
        return [{
            "click input": this.clicked
        }];
    };

    Checkbox.prototype.clicked = function (event) {
        var self;
        self = this;
        self.value.set(event.target.value);
        self.error.set(false);
        return self.status.set(false);
    };

    Checkbox.prototype.setStatus = function (status, isError) {
        var self;
        self = this;
        if (!isError && typeof status === "boolean") {
            isError = status;
            if (isError) {
                status = self.data().errorText;
            } else {
                status = self.data().statusText;
            }
        }
        self.status.set(status);
        return self.error.set(isError);
    };

    return Checkbox;

})(Apollos.Component);