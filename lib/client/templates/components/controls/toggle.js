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

Apollos.Controls.Toggle = (function (superClass) {
    extend(Toggle, superClass);

    function Toggle() {
        return Toggle.__super__.constructor.apply(this, arguments);
    }

    Toggle.register("Apollos.Controls.Toggle");

    Toggle.prototype.events = function () {
        return [{
            "click [data-toggle]": this.toggle
        }];
    };

    Toggle.prototype.toggle = function (event) {
        var currentData, parent, ref, self;
        self = this;
        parent = self.parent();
        currentData = parent.currentData();
        if (((ref = event.target.dataset) != null ? ref.toggle : void 0) === "item1") {
            return currentData.active.set(true);
        } else {
            return currentData.active.set(false);
        }
    };

    return Toggle;

})(Apollos.Component);