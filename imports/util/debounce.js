// converted from coffeescript in old newspring core js
var Debouncer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Debouncer = (function() {
  function Debouncer(data) {
    this.data = data;
    this.handleEvent = bind(this.handleEvent, this);
    this.requestTick = bind(this.requestTick, this);
    this.update = bind(this.update, this);

    if (Meteor.isServer) {
      this.data()
      return
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    this.callback = this.data;
    this.ticking = false;
  }

  Debouncer.prototype.update = function() {
    this.callback && this.callback();
    return this.ticking = false;
  };

  Debouncer.prototype.requestTick = function() {
    if (!this.ticking) {
      requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
      return this.ticking = true;
    }
  };

  Debouncer.prototype.handleEvent = function() {
    return this.requestTick();
  };

  return Debouncer;

})();

export default Debouncer
