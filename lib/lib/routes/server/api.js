var URL, authenticate, createEndpoint, deleteResource, getPlatform, handleAuthenticationError, handleBadRequestError, jsonContentType, ref, typeName, upsertResource, url;

jsonContentType = "application/JSON";

URL = Npm.require("url");


/*

  handleBadRequestError

  @example set the status code of an API request indicated it was a bad request

    HTTP.methods
      "api/v1/stuff":
        get: ->
          return handleBadRequestError.call this

  @param context should be the HTTP.methods handler function
 */

handleBadRequestError = function () {
    this.setStatusCode(400);
};


/*

  handleAuthenticationError

  @example set the status code of an API request indicated it was unauthorized

    HTTP.methods
      "api/v1/stuff":
        get: ->
          return handleAuthenticationError.call this

  @param context should be the HTTP.methods handler function
 */

handleAuthenticationError = function () {
    this.setStatusCode(401);
};


/*

  authenticate

  @example returns true if the request can be authenticated

    HTTP.methods
      "api/v1/stuff":
        get: ->
          if not authenticate.call this
            return handleAuthenticationError.call this

  @param context should be the HTTP.methods handler function
 */

authenticate = function () {
    var sentToken;
    sentToken = this.requestHeaders[Apollos.api.tokenName];
    return sentToken === Apollos.api.token;
};


/*

  deleteResource

  @example authenticates and then calls the delete handler

    return deleteResource.call @, Apollos.person.delete, platform

  @param context should be the HTTP.methods handler function
  @param handlerFunc is the function that will delete the resource
  @param platform is the source of the request to delete the resource
 */

deleteResource = function (handlerFunc, platform) {
    var id;
    this.setContentType(jsonContentType);
    if (!authenticate.call(this)) {
        return handleAuthenticationError.call(this);
    }
    id = Number(this.params.id);
    handlerFunc(id, platform);
};


/*

  upsertResource

  @example authenticates and then calls the upsert handler

    return upsertResource.call @, data, Apollos.person.update, platform

  @param context should be the HTTP.methods handler function
  @param data is the javascript object with the request data
  @param handlerFunc is the function that will upsert the resource
  @param platform is the source of the request to upsert the resource
 */

upsertResource = function (data, handlerFunc, platform) {
    var resource;
    this.setContentType(jsonContentType);
    if (!authenticate.call(this)) {
        return handleAuthenticationError.call(this);
    }
    resource = parseRequestData(data, this.requestHeaders["content-type"]);
    if (!resource) {
        resource = {};
    }
    resource.Id = Number(this.params.id);
    handlerFunc(resource, platform);
};

getPlatform = function (host, collection) {
    var allEndpoints, foundPlatform, i, len, platform, platformHost, ref;
    host = URL.parse(host);
    if (!((ref = Apollos.api.endpoints[collection]) != null ? ref.platforms : void 0) || Apollos.api.allEndpoints.length === 0) {
        return false;
    }
    foundPlatform = false;
    allEndpoints = _.union(Apollos.api.endpoints[collection].platforms, Apollos.api.allEndpoints);
    for (i = 0, len = allEndpoints.length; i < len; i++) {
        platform = allEndpoints[i];
        platformHost = URL.parse(platform.url);
        if (!host.href.match(platformHost.href)) {
            continue;
        }
        foundPlatform = platform.platform;
        break;
    }
    return foundPlatform;
};


/*

  createEndpoint

  @example creartes a standard API endpoint at the given URL for the given
    entity

    createEndpoint "api/v1/people/", "person"

  @param url [String] the endpoint for the API to operate at
  @param entityType [String] is the name of the Apollos type that this endpoint
    is associated with
 */

createEndpoint = function (url, collection, obj) {
    return obj[Apollos.api.base + "/" + url + ":id"] = {
        post: function (data) {
            var platform;
            platform = getPlatform(this.requestHeaders.host, collection);
            if (!platform) {
                return;
            }
            Apollos.debug("Got POST for " + url + this.params.id);
            return upsertResource.call(this, data, Apollos[collection].update, platform);
        },
        "delete": function (data) {
            var platform;
            platform = getPlatform(this.requestHeaders.host, collection);
            if (!platform) {
                return;
            }
            Apollos.debug("Got DELETE for " + url + this.params.id);
            return deleteResource.call(this, Apollos[collection]["delete"], platform);
        }
    };
};

Apollos.api.addEndpoint = function (collection, endpoint) {
    var obj;
    obj = {};
    if (Apollos.api.endpoints[collection]) {
        Apollos.debug("There is already an endpoint for " + collection);
        return;
    }
    Apollos.api.endpoints[collection] = {
        url: Apollos.api.base + "/" + endpoint
    };
    createEndpoint(collection, endpoint, obj);
    HTTP.methods(obj);
};

ref = Apollos.api.endpoints;
for (typeName in ref) {
    url = ref[typeName];
    Apollos.api.addEndpoint(url.url, typeName);
}