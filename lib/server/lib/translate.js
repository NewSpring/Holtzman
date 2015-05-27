Apollos.translate = function (collection, platform, handler) {
    var base;
    if (!Apollos[collection]) {
        Apollos.debug("Cannot set translate method for " + collection + " becuase it doesn't exist");
        return;
    }
    if (!platform) {
        Apollos.debug("Must specify platform");
        return;
    }(base = Apollos[collection])._dictionary || (base._dictionary = {});
    if (Apollos[collection]._dictionary[platform]) {
        Apollos.debug("The translation for " + collection + " from " + platform + " has already been set");
        return;
    }
    Apollos[collection]._dictionary[platform] = handler;
};