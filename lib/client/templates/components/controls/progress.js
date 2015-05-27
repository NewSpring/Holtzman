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

Apollos.Controls.Progress = (function (superClass) {
    extend(Progress, superClass);

    function Progress() {
        return Progress.__super__.constructor.apply(this, arguments);
    }

    Progress.register("Apollos.Controls.Progress");

    Progress.prototype.steps = function () {
        var i, ref, results, self, steps;
        self = this;
        steps = (ref = self.data().total) != null ? ref.get() : void 0;
        if (typeof steps !== "number") {
            return;
        }
        steps = (function () {
            results = [];
            for (var i = 1; 1 <= steps ? i <= steps : i >= steps; 1 <= steps ? i++ : i--) {
                results.push(i);
            }
            return results;
        }).apply(this).map(function (value) {
            return {
                count: value,
                active: self.data().active
            };
        });
        return steps;
    };

    Progress.prototype.events = function () {
        return [{
            "click [data-step]": this.changeStep
        }];
    };

    Progress.prototype.changeStep = function (event) {
        var self, step;
        self = this;
        step = event.currentTarget.dataset.step;
        return self.data().active.set(Number(step));
    };

    Progress.prototype.getLayer = function (count) {
        var ref, self, steps;
        self = this;
        steps = (ref = self.data().total) != null ? ref.get() : void 0;
        return Number(steps) + 2 - Number(count);
    };

    return Progress;

})(Apollos.Component);