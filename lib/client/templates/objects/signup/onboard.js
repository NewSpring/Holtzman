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

Apollos.Profile.OnBoard = (function (superClass) {
    extend(OnBoard, superClass);

    function OnBoard() {
        return OnBoard.__super__.constructor.apply(this, arguments);
    }

    OnBoard.register("Apollos.Profile.OnBoard");

    OnBoard.prototype.vars = function () {
        return [{
            passwordForget: false,
            email: ""
        }];
    };

    OnBoard.prototype.resetPasswordToken = function () {
        return Session.get("resetPasswordToken");
    };

    return OnBoard;

})(Apollos.Component);