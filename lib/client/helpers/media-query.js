var Debounce, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Debounce = (function () {
    function Debounce(data) {
        this.data = data;
        this.handleEvent = bind(this.handleEvent, this);
        this.requestTick = bind(this.requestTick, this);
        this.update = bind(this.update, this);
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        this.callback = this.data;
        this.ticking = false;
    }

    Debounce.prototype.update = function () {
        this.callback && this.callback();
        return this.ticking = false;
    };

    Debounce.prototype.requestTick = function () {
        if (!this.ticking) {
            requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
            return this.ticking = true;
        }
    };

    Debounce.prototype.handleEvent = function () {
        return this.requestTick();
    };

    return Debounce;

})();

Meteor.startup(function () {
    var currentHeight, currentSize, currentSizeDep, stylesApplied, test, testHeight;
    currentSize = "";
    currentHeight = "";
    currentSizeDep = new Tracker.Dependency;
    stylesApplied = [];
    test = function (size) {
        currentSizeDep.depend();
        return currentSize.match(size);
    };
    testHeight = function (size) {
        currentSizeDep.depend();
        return currentHeight.match(size);
    };
    Tracker.nonreactive(function () {
        var deouncedGetSize, getSize, heightMarker, marker;
        marker = document.createElement("DIV");
        marker.className = "media-query";
        heightMarker = document.createElement("DIV");
        heightMarker.className = "media-query-height";
        marker.style.display = "none !important";
        heightMarker.style.display = "none !important";
        document.body.appendChild(marker);
        document.body.appendChild(heightMarker);
        getSize = function () {
            var heightTrackingElement, trackingElement;
            trackingElement = document.getElementsByClassName("media-query")[0];
            heightTrackingElement = document.getElementsByClassName("media-query-height")[0];
            if (trackingElement.currentStyle) {
                currentSize = trackingElement.currentStyle["content"];
                currentHeight = heightTrackingElement.currentStyle["content"];
            } else if (window.getComputedStyle) {
                currentSize = document.defaultView.getComputedStyle(trackingElement, null).getPropertyValue("content");
                currentHeight = document.defaultView.getComputedStyle(heightTrackingElement, null).getPropertyValue("content");
            }
            currentSizeDep.changed();
        };
        deouncedGetSize = new Debounce(getSize);
        window.addEventListener("resize", deouncedGetSize, false);
        return getSize();
    });
    Template.registerHelper("MediaQuery", function (size) {
        return test(size);
    });
    return Template.registerHelper("MediaQueryHeight", function (size) {
        return testHeight(size);
    });
});