var sync, syncAllWhenRockIsReady;

sync = function (entityType, msTime) {
    return Meteor.setTimeout(function () {
        debug("\n*** STARTING ROCK SYNC: " + entityType + " ***\n");
        return Rock[entityType].refresh(true);
    }, msTime);
};

syncAllWhenRockIsReady = function () {
    var entities, entity, i, len, msSpacing, msTime, results;
    if (!Rock.isAlive()) {
        debug("Waiting to sync because Rock is not responding");
        Meteor.setTimeout(syncAllWhenRockIsReady, 15000);
        return;
    }
    entities = ["definedValues", "users", "people"];
    msTime = 0;
    msSpacing = 1000;
    results = [];
    for (i = 0, len = entities.length; i < len; i++) {
        entity = entities[i];
        sync(entity, msTime);
        results.push(msTime += msSpacing);
    }
    return results;
};

Meteor.startup(function () {
    if (!process.env.IS_MIRROR) {
        return serverWatch.refresh(Rock.name, syncAllWhenRockIsReady);
    }
});