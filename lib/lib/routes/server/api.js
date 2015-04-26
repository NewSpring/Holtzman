var api, authenticate, baseURL, createStandardEndpoint, deleteResource, endpoints, handleAuthenticationError, handleBadRequestError, jsonContentType, token, tokenName, typeName, upsertResource, url;

baseURL = "api/v1/";

endpoints = {
    user: baseURL + "users/",
    person: baseURL + "people/",
    transaction: baseURL + "transactions/",
    transactionDetail: baseURL + "transactionDetails/",
    account: baseURL + "accounts/"
};

jsonContentType = "application/JSON";

tokenName = Meteor.settings.api.tokenName;

token = Meteor.settings.api.token;

api = {};


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
    sentToken = this.requestHeaders[tokenName];
    return sentToken === token;
};


/*

  deleteResource

  @example authenticates and then calls the delete handler

    return deleteResource.call @, Apollos.person.delete, Rock.name

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

    return upsertResource.call @, data, Apollos.person.update, Rock.name

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
    console.log(resource);
    if (!resource) {
        resource = {};
    }
    resource.Id = Number(this.params.id);
    handlerFunc(resource, platform);
};


/*

  createStandardEndpoint

  @example creartes a standard API endpoint at the given URL for the given
    entity

    createStandardEndpoint "api/v1/people/", "person"

  @param url [String] the endpoint for the API to operate at
  @param entityType [String] is the name of the Apollos type that this endpoint
    is associated with
 */

createStandardEndpoint = function (url, entityType) {
    return api[url + ":id"] = {
        post: function (data) {
            debug("Got POST for " + url + this.params.id);
            return upsertResource.call(this, data, Apollos[entityType].update, Rock.name);
        },
        "delete": function (data) {
            debug("Got DELETE for " + url + this.params.id);
            return deleteResource.call(this, Apollos[entityType]["delete"], Rock.name);
        }
    };
};

for (typeName in endpoints) {
    url = endpoints[typeName];
    createStandardEndpoint(url, typeName);
}

HTTP.methods(api);