Apollos.debug = function () {
    return console.log.apply(console, Array.prototype.slice.call(arguments));
};