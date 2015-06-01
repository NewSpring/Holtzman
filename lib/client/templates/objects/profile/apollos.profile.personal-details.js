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

Apollos.Profile.PersonalDetails = (function (superClass) {
    extend(PersonalDetails, superClass);

    function PersonalDetails() {
        return PersonalDetails.__super__.constructor.apply(this, arguments);
    }

    PersonalDetails.register("Apollos.Profile.PersonalDetails");

    PersonalDetails.prototype.vars = function () {
        return [{
            hasErrors: false
        }];
    };

    PersonalDetails.prototype.onCreated = function () {
        var ref;
        return (ref = this.parent().title) != null ? ref.set("Personal Details") : void 0;
    };

    PersonalDetails.prototype.onRendered = function () {
        return this.parent().checkForValidated();
    };

    PersonalDetails.prototype.campuses = function () {
        return [{
            name: "Greenville",
            val: 8
        }, {
            name: "Anderson",
            val: 7
        }, {
            name: "Greenwood",
            val: 9
        }, {
            name: "Florence",
            val: 10
        }];
    };

    return PersonalDetails;

})(Apollos.Component);