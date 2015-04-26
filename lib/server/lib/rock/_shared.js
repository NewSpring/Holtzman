Rock.tokenName = Meteor.settings.rock.tokenName;

Rock.baseURL = Meteor.settings.rock.baseURL;

Rock.token = Meteor.settings.rock.token;

if (serverWatch.getKeys().indexOf(Rock.name) !== -1) {
    serverWatch.stopWatching(Rock.name);
}

serverWatch.watch(Rock.name, Rock.baseURL, 30 * 1000);


/*

  Rock.apiRequest

  @example make an API call to Rock

    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err

      console.log data

  @param method [String] CRUD Method desired
  @param resource [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response
 */

Rock.apiRequest = function (method, resource, data, callback) {
    var cursor, handle, headers, queueId;
    if (typeof data === "function") {
        callback = data;
        data = void 0;
    }
    headers = {};
    if (Rock.tokenName && Rock.token) {
        headers[Rock.tokenName] = Rock.token;
    }
    debug("Queueing request " + (resource.substring(0, 25)));
    queueId = Apollos.queuedApiRequests.insert({
        method: method,
        date: new Date(),
        url: "" + Rock.baseURL + resource,
        headers: JSON.stringify(headers),
        data: JSON.stringify(data),
        isTest: Boolean(process.env.IS_MIRROR),
        workerShouldDelete: !callback
    });
    if (!callback) {
        return;
    }
    cursor = Apollos.queuedApiRequests.find({
        _id: queueId
    }, {
        fields: {
            responseReceived: 1
        },
        limit: 1
    });

/*
    This observeChanges (and all other observers for that matter) can be more
    efficient if we set the MONGO_OPLOG_URL environment variable.
  
    http://projectricochet.com/blog/magic-meteor-oplog-tailing#.VTenxq1VhBd
   */
    return handle = cursor.observeChanges({
        changed: function (id, changedFields) {
            var error, jsonData, jsonError, response;
            if (!changedFields.responseReceived) {
                return;
            }
            debug("Received response from " + (resource.substring(0, 25)));
            response = Apollos.queuedApiRequests.findOne(queueId);
            jsonError = response.responseError;
            jsonData = response.responseData;
            if (jsonError) {
                error = JSON.parse(jsonError);
            }
            if (jsonData) {
                data = JSON.parse(jsonData);
            }
            callback(error, data);
            handle.stop();
            return Apollos.queuedApiRequests.remove(queueId);
        }
    });
};


/*

  Rock.refreshEntity

  @example refesh the users collection from Rock

    Rock.refreshEntity "api/UserLogins", "user", "users", throwErrors

  @param endpoint [String] API enpoint on Rock
  @param entityName [String] The singular name of an entity (ie person, user)
  @param apollosCollection [String] The plural name of an entity (ie people,
    users)
  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.refreshEntity = function (endpoint, entityName, apollosCollection, throwErrors, oneWaySync) {
    return Rock.apiRequest("GET", endpoint, function (error, result) {
        var doc, docId, docIdsSynced, docsRockDoesNotHave, docsRockDoesNotHaveIds, errorType, i, j, len, len1, message, model, numDocsRockDoesNotHave, query, ref, results, rockModels;
        if (error) {
            message = (endpoint.substring(0, 25)) + "...: " + error;
            errorType = "Rock sync issue";
            if (throwErrors) {
                throw new Meteor.Error(errorType, message);
            } else {
                debug(errorType);
                debug(message);
            }
            return;
        }
        rockModels = result.data;
        docIdsSynced = [];
        for (i = 0, len = rockModels.length; i < len; i++) {
            model = rockModels[i];
            docId = Apollos[entityName].update(model, Rock.name);
            debug("Synced " + entityName + " from Rock: " + model.Id);
            if (docId) {
                docIdsSynced.push(docId);
            }
        }
        query = {
            _id: {
                $nin: docIdsSynced
            }
        };
        docsRockDoesNotHave = Apollos[apollosCollection].find(query);
        docsRockDoesNotHaveIds = docsRockDoesNotHave.map(function (d) {
            return d._id;
        });
        numDocsRockDoesNotHave = docsRockDoesNotHave.count();
        if (numDocsRockDoesNotHave === 0) {
            return;
        }
        if (oneWaySync) {
            debug("One way sync, so deleting " + (docsRockDoesNotHaveIds.join(", ")) + " " + entityName);
            return Apollos[apollosCollection].remove(query);
        } else {
            debug("Two way sync, so sending " + (docsRockDoesNotHaveIds.join(", ")) + " " + entityName);
            ref = docsRockDoesNotHave.fetch();
            results = [];
            for (j = 0, len1 = ref.length; j < len1; j++) {
                doc = ref[j];
                results.push(Rock[entityName].create(doc));
            }
            return results;
        }
    });
};