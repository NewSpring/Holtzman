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

Apollos.Controls || (Apollos.Controls = {});

Apollos.Controls.NumberKeyboard = (function (superClass) {
    extend(NumberKeyboard, superClass);

    function NumberKeyboard() {
        return NumberKeyboard.__super__.constructor.apply(this, arguments);
    }

    NumberKeyboard.register("Apollos.Controls.NumberKeyboard");

    NumberKeyboard.prototype.onRendered = function () {
        var self;
        self = this;
        return $(document).off("keyup").on("keyup", function (event) {
            var numPressed;
            if (event.which >= 48 && event.which <= 57) {
                numPressed = event.which - 48;
            } else if (event.which >= 96 && event.which <= 105) {
                numPressed = event.which - 96;
            } else if (event.which === 46) {
                numPressed = -1;
            } else if (event.which === 190 || event.which === 110) {
                numPressed = ".";
            }
            if (typeof numPressed !== "undefined") {
                self.doPressAnimation($("[data-key=\"" + numPressed + "\"]"));
                self.processTypedText(numPressed);
                return self.parent().updateFund(self.typedText.get());
            }
        });
    };

    NumberKeyboard.prototype.onDestroyed = function () {
        return $(document).off("keyup");
    };

    NumberKeyboard.prototype.vars = function () {
        return [{
            typedText: "",
            cancelClick: false
        }];
    };

    NumberKeyboard.prototype.events = function () {
        return [{
            "touchstart [data-key]": this.clickedDataKey,
            "click [data-key]": this.clickedDataKey
        }];
    };

    NumberKeyboard.prototype.clickedDataKey = function (event, template) {
        var keyPressed;
        if (event.type === "touchstart") {
            this.cancelClick.set(true);
        } else if (this.cancelClick.get()) {
            this.cancelClick.set(false);
            return;
        }
        this.doPressAnimation(event.currentTarget);
        keyPressed = event.currentTarget.getAttribute("data-key");
        this.processTypedText(keyPressed);
        return this.parent().updateFund(this.typedText.get());
    };

    NumberKeyboard.prototype.onCreated = function () {
        var self;
        self = this;
        return self.autorun(function () {
            var fundAmount;
            fundAmount = self.parent().getFundAmount();
            if (fundAmount && fundAmount.amount !== "0") {
                return self.typedText.set(fundAmount.amount);
            } else {
                return self.typedText.set("");
            }
        });
    };

    NumberKeyboard.prototype.doPressAnimation = function (element) {
        var jQueryElement;
        jQueryElement = $(element);
        jQueryElement.addClass("touched");
        return Meteor.setTimeout(function () {
            return jQueryElement.removeClass("touched");
        }, 150);
    };

    NumberKeyboard.prototype.processTypedText = function (keyValue) {
        var currentText, decimalIndex, hasDecimal, isEmpty;
        keyValue = String(keyValue);
        currentText = this.typedText.get();
        isEmpty = currentText.length === 0;
        decimalIndex = currentText.indexOf(".");
        hasDecimal = decimalIndex !== -1;
        if (keyValue === "-1") {
            this.parent().checkForIncrease();
            this.typedText.set(currentText.slice(0, -1));
            return;
        }
        if (keyValue === "." && (hasDecimal || isEmpty)) {
            return;
        }
        if (keyValue === "0" && isEmpty) {
            return;
        }
        if (hasDecimal && currentText.length - decimalIndex > 2) {
            return;
        }
        return this.typedText.set(currentText + keyValue);
    };

    NumberKeyboard.prototype.output = function () {
        var typedText;
        typedText = this.typedText.get();
        return typedText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    NumberKeyboard.prototype.keys = function () {
        var keys;
        keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (v) {
            return {
                value: v,
                display: v,
                css: "key"
            };
        });
        keys.push({
            value: ".",
            display: "&middot;"
        });
        keys.push({
            value: 0,
            display: 0
        });
        keys.push({
            value: -1,
            display: '<span class="icon-backspace"></span>'
        });
        return keys;
    };

    return NumberKeyboard;

})(Apollos.Component);