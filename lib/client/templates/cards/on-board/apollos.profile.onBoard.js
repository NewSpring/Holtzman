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

Apollos.profile.onBoard = (function (superClass) {
    extend(onBoard, superClass);

    function onBoard() {
        return onBoard.__super__.constructor.apply(this, arguments);
    }

    onBoard.register("Apollos.profile.onBoard");

    onBoard.card(true);

    onBoard.prototype.vars = function () {
        return [{
            state: "profile.signIn",
            email: ""
        }];
    };

    onBoard.prototype.resetPasswordToken = function () {
        return Session.get("resetPasswordToken");
    };

    onBoard.prototype.onCreated = function () {
        return console.log("foobar");
    };

    return onBoard;

})(Apollos.Component);