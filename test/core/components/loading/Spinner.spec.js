"use strict";
var React = require("react");
var chai_1 = require("chai");
var enzyme_1 = require("enzyme");
var chaiEnzyme = require("chai-enzyme");
chai_1.default.use(chaiEnzyme());
var Spinner_1 = require("./../../../../src/core/components/loading/Spinner");
describe("<Spinner /> component", function () {
    it("has the correct classname", function () {
        var wrapper = enzyme_1.shallow(React.createElement(Spinner_1.default, null));
        chai_1.expect(wrapper.hasClass("loader")).to.equal(true);
    });
    it("can apply the theme", function () {
        var wrapper = enzyme_1.shallow(React.createElement(Spinner_1.default, {theme: "foobar"}));
        chai_1.expect(wrapper.hasClass("foobar")).to.equal(true);
    });
});
