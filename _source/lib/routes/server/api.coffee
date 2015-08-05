_jsonContentType = "application/JSON"
_authenticationError = 401

###

  authenticate

  @example returns true if the request can be authenticated

    HTTP.methods
      "api/v1/stuff":
        get: ->
          if not authenticate.call this
            return handleAuthenticationError.call this

  @param context should be the HTTP.methods handler function

###
authenticatePlatform = (collection) ->

  sentToken = @.requestHeaders[Apollos.api.tokenName]

  for name, details of Apollos.api.platforms
    token = details.token
    collections = details.collections

    tokenMatch = token is sentToken
    collectionMatch = collections is "all"

    if not collectionMatch
      collectionMatch = collections.indexOf(collection) isnt -1

    if tokenMatch and collectionMatch
      return details

  @.setStatusCode _authenticationError
  return false

###

  deleteResource

  @example authenticates and then calls the delete handler

    return deleteResource.call @, Apollos.person.delete, platform

  @param context should be the HTTP.methods handler function
  @param handlerFunc is the function that will delete the resource
  @param platform is the source of the request to delete the resource

###
deleteResource = (handlerFunc, platform) ->

  @.setContentType _jsonContentType
  id = Number @.params.id
  handlerFunc id, platform
  return

###

  upsertResource

  @example authenticates and then calls the upsert handler

    return upsertResource.call @, data, Apollos.person.update, platform

  @param context should be the HTTP.methods handler function
  @param data is the javascript object with the request data
  @param handlerFunc is the function that will upsert the resource
  @param platform is the source of the request to upsert the resource

###
upsertResource = (data, handlerFunc, platform) ->

  @.setContentType _jsonContentType
  resource = parseRequestData data, @.requestHeaders["content-type"]
  resource or= {}
  resource.Id = Number @.params.id
  handlerFunc resource, platform
  return

###

  createEndpoint

  @example creartes a standard API endpoint at the given URL for the given
    entity

    createEndpoint "api/v1/people/", "person"

  @param url [String] the endpoint for the API to operate at
  @param entityType [String] is the name of the Apollos type that this endpoint
    is associated with

###
createEndpoint = (collection, singular) ->
  url = "#{Apollos.api.base}/#{collection}/:id"

  method = {}
  method[url] =

    post: (data) ->
      Apollos.debug "Got POST #{url} id=#{@.params.id}"
      platform = authenticatePlatform.call @, collection

      if not platform
        Apollos.debug "Dropping request because of unknown platform"
        return

      return upsertResource.call @, data, Apollos[singular].update, platform.name

    delete: (data) ->
      Apollos.debug "Got DELETE for #{url} id=#{@.params.id}"
      platform = authenticatePlatform.call @, collection

      if not platform
        Apollos.debug "Dropping request because of unknown platform"
        return

      return deleteResource.call @, Apollos[singular].delete, platform.name

  HTTP.methods method
  return url


# Register a collection's endpoint
Apollos.api.addEndpoint = (collection, singular) ->

  obj = {}

  if Apollos.api.endpoints[collection]
    Apollos.debug "There is already an endpoint for #{collection}"
    return

  url = createEndpoint collection, singular
  Apollos.api.endpoints[collection] = url: url

  return


# Register a platform
Apollos.api.addPlatform = (name, collections) ->

  name = name.toUpperCase()

  if Apollos.api.platforms[name]
    Apollos.debug "There is already a platform for #{name}"
    return

  token = Meteor.settings.api[name.toLowerCase()]

  if not token
    Apollos.debug "Cannot add #{name} to API as platform because there is no
      token assigned in the Meteor settings"

  Apollos.api.platforms[name] =
    token: token
    collections: collections
    name: name
