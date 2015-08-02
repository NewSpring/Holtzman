_jsonContentType = "application/JSON"

###

  handleBadRequestError

  @example set the status code of an API request indicated it was a bad request

    HTTP.methods
      "api/v1/stuff":
        get: ->
          return handleBadRequestError.call this

  @param context should be the HTTP.methods handler function

###
handleBadRequestError = ->

  @.setStatusCode(400)
  return

###

  handleAuthenticationError

  @example set the status code of an API request indicated it was unauthorized

    HTTP.methods
      "api/v1/stuff":
        get: ->
          return handleAuthenticationError.call this

  @param context should be the HTTP.methods handler function

###
handleAuthenticationError = ->

  @.setStatusCode(401)
  return

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
authenticate = ->

  sentToken = @.requestHeaders[Apollos.api.tokenName]
  return sentToken is Apollos.api.token

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

  if not authenticate.call @
    return handleAuthenticationError.call @

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

  if not authenticate.call @
    console.log "authentication error"
    return handleAuthenticationError.call @

  resource = parseRequestData data, @.requestHeaders["content-type"]

  if not resource
    resource = {}

  resource.Id = Number @.params.id
  handlerFunc resource, platform
  return


# Check if the source of the request came from a registered platform
getPlatform = (ip, collection) ->
  for name, details of Apollos.api.platforms
    ipAllowed = details.ipAddresses is "*"
    collectionAuthorized = details.collections is "all"

    if not ipAllowed
      ipAllowed = details.ipAddresses.indexOf(ip) isnt -1

    if not collectionAuthorized
      collectionAuthorized = details.collections.indexOf(collection) isnt -1

    if ipAllowed and collectionAuthorized
      return name

  return false

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
      ip = @.request.headers["x-forwarded-for"]
      platform = getPlatform ip, collection

      if not platform
        Apollos.debug "Dropping request from #{ip}"
        handleAuthenticationError.call @
        return

      return upsertResource.call @, data, Apollos[singular].update, platform

    delete: (data) ->
      Apollos.debug "Got DELETE for #{url} id=#{@.params.id}"
      ip = @.request.headers["x-forwarded-for"]
      platform = getPlatform ip, collection

      if not platform
        Apollos.debug "Dropping request from #{ip}"
        handleAuthenticationError.call @
        return

      return deleteResource.call @, Apollos[singular].delete, platform

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
Apollos.api.addPlatform = (name, ipAddresses, collections) ->

  if not Array.isArray(ipAddresses) and ipAddresses isnt "*"
    ipAddresses = [ipAddresses]

  name = name.toUpperCase()

  if Apollos.api.platforms[name]
    Apollos.debug "There is already a platform for #{name}"
    return

  Apollos.api.platforms[name] =
    ipAddresses: ipAddresses
    collections: collections
