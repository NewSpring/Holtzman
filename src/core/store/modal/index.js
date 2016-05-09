"use strict";
var reducer_1 = require("./reducer");
var utilities_1 = require("../utilities");
utilities_1.addReducer({
    modal: reducer_1.default,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    hide: function () { return ({ type: "MODAL.SET_VISIBILITY", visible: false }); },
    show: function () { return ({ type: "MODAL.SET_VISIBILITY", visible: true }); },
    render: function (content, props) { return ({ type: "MODAL.SET_CONTENT", content: content, visible: true, props: props }); },
    update: function (props) { return ({ type: "MODAL.SET_PROPS", props: props }); },
    changeTo: function (state) { return ({ type: "MODAL.SET_TYPE", state: state }); },
};
