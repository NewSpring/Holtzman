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

Apollos.Profile.PaymentDetails = (function (superClass) {
    extend(PaymentDetails, superClass);

    function PaymentDetails() {
        return PaymentDetails.__super__.constructor.apply(this, arguments);
    }

    PaymentDetails.register("Apollos.Profile.PaymentDetails");

    PaymentDetails.prototype.vars = function () {
        return [{
            toggleState: true
        }];
    };

    return PaymentDetails;

})(Apollos.Component);