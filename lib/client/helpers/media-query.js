var _debounce, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

_debounce = (function () {
    function _debounce(data) {
        this.data = data;
        this.handleEvent = bind(this.handleEvent, this);
        this.requestTick = bind(this.requestTick, this);
        this.update = bind(this.update, this);
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        this.callback = this.data;
        this.ticking = false;
    }

    _debounce.prototype.update = function () {
        this.callback && this.callback();
        return this.ticking = false;
    };

    _debounce.prototype.requestTick = function () {
        if (!this.ticking) {
            requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
            return this.ticking = true;
        }
    };

    _debounce.prototype.handleEvent = function () {
        return this.requestTick();
    };

    return _debounce;

})();

Meteor.startup(function () {
    var currentSize, currentSizeDep, stylesApplied, test;
    currentSize = "";
    currentSizeDep = new Tracker.Dependency;
    stylesApplied = [];
    test = function (size) {
        currentSizeDep.depend();
        return currentSize.match(size);
    };
    Tracker.nonreactive(function () {
        var deouncedGetSize, getSize, marker;
        marker = document.createElement("DIV");
        marker.className = "media-query";
        marker.style.display = "none !important";
        document.body.appendChild(marker);
        getSize = function () {
            var trackingElement;
            trackingElement = document.getElementsByClassName("media-query")[0];
            if (trackingElement.currentStyle) {
                currentSize = trackingElement.currentStyle["content"];
            } else if (window.getComputedStyle) {
                currentSize = document.defaultView.getComputedStyle(trackingElement, null).getPropertyValue("content");
            }
            currentSizeDep.changed();
        };
        deouncedGetSize = new _debounce(getSize);
        window.addEventListener("resize", deouncedGetSize, false);
        return getSize();
    });
    return Template.registerHelper("MediaQuery", function (size) {
        return test(size);
    });
});