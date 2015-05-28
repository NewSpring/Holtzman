Apollos.observe = function (collection) {
    var initializing;
    initializing = true;
    Apollos[collection].find().observe({
        added: function (doc) {
            var base, handle, platform, ref, results;
            if (initializing) {
                return;
            }(base = Apollos[collection]).added || (base.added = {});
            ref = Apollos[collection].added;
            results = [];
            for (platform in ref) {
                handle = ref[platform];
                results.push(handle(doc));
            }
            return results;
        },
        changed: function (newDoc, oldDoc) {
            var base, handle, platform, ref, results;
            (base = Apollos[collection]).changed || (base.changed = {});
            ref = Apollos[collection].changed;
            results = [];
            for (platform in ref) {
                handle = ref[platform];
                results.push(handle(newDoc, oldDoc));
            }
            return results;
        },
        removed: function (doc) {
            var base, handle, platform, ref, results;
            (base = Apollos[collection]).deleted || (base.deleted = {});
            ref = Apollos[collection].deleted;
            results = [];
            for (platform in ref) {
                handle = ref[platform];
                results.push(handle(doc));
            }
            return results;
        }
    });
    return initializing = false;
};

Apollos.observe.remove = function (doc, platform, methods) {
    var i, len, method, results;
    if (!Apollos[doc]) {
        Apollos.debug("Cannot remove observe methods for " + doc + " becuase it doesn't exist");
        return;
    }
    if (!platform) {
        Apollos.debug("Must specify platform");
        return;
    }
    if (!methods) {
        methods = ["added", "changed", "removed"];
    }
    results = [];
    for (i = 0, len = methods.length; i < len; i++) {
        method = methods[i];
        results.push(delete Apollos[doc][method]);
    }
    return results;
};

Apollos.observe.add = function (doc, platform, methods) {
    var base, handle, method;
    if (!Apollos[doc]) {
        Apollos.debug("Cannot set observe methods for " + doc + " becuase it doesn't exist");
        return;
    }
    if (!platform) {
        Apollos.debug("Must specify platform");
        return;
    }
    for (method in methods) {
        handle = methods[method];
        (base = Apollos[doc])[method] || (base[method] = {});
        if (Apollos[doc][method][platform]) {
            Apollos.debug("The " + method + " observe handler for " + doc + " from " + platform + " has already been set");
            return;
        }
        Apollos[doc][method][platform] = handle;
    }
};