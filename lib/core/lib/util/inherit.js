"use strict";

exports.__esModule = true;

function inherit(Child, Parent) {

  // copy Parent static properties
  Child = Object.assign(Child, Parent);

  // a middle member of prototype chain: takes the prototype from the Parent
  var Middle = function Middle() {
    this.constructor = Child;
  };
  Middle.prototype = Parent.prototype;
  Child.prototype = new Middle();
  Child.__super__ = Parent.prototype;
  return Child;
}

exports.inherit = inherit;