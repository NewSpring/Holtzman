
jsonContentType = "application/JSON"
URL = Npm.require "url"

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

  @.setContentType jsonContentType

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

  @.setContentType jsonContentType

  if not authenticate.call @
    return handleAuthenticationError.call @

  resource = parseRequestData data, @.requestHeaders["content-type"]


  if not resource
    resource = {}

  resource.Id = Number @.params.id
  handlerFunc resource, platform
  return


getPlatform = (host, collection) ->
  host = URL.parse(host)

  if not Apollos.api.endpoints[collection]?.platforms or Apollos.api.allEndpoints.length is 0
    return false

  foundPlatform = false

  allEndpoints = _.union(
    Apollos.api.endpoints[collection].platforms,
    Apollos.api.allEndpoints
  )

  for platform in allEndpoints
    platformHost = URL.parse(platform.url)

    if not host.href.match platformHost.href
      continue

    foundPlatform = platform.platform
    break



  return foundPlatform

###

  createEndpoint

  @example creartes a standard API endpoint at the given URL for the given
    entity

    createEndpoint "api/v1/people/", "person"

  @param url [String] the endpoint for the API to operate at
  @param entityType [String] is the name of the Apollos type that this endpoint
    is associated with

###

# TODO build registration service for platforms (how do we know who is calling?)
createEndpoint = (url, collection, obj) ->
  obj["#{Apollos.api.base}/#{url}:id"] =

    post: (data) ->
      platform = getPlatform @.requestHeaders.host, collection

      if not platform
        return

      Apollos.debug "Got POST for #{url}#{@.params.id}"
      return upsertResource.call @, data, Apollos[collection].update, platform

    delete: (data) ->
      platform = getPlatform @.requestHeaders.host, collection

      if not platform
        return

      Apollos.debug "Got DELETE for #{url}#{@.params.id}"
      return deleteResource.call @, Apollos[collection].delete, platform




Apollos.api.addEndpoint = (collection, endpoint) ->

  obj = {}

  if Apollos.api.endpoints[collection]
    Apollos.debug "There is already an endpoint for #{collection}"
    return

  Apollos.api.endpoints[collection] =
    url: "#{Apollos.api.base}/#{endpoint}"

  createEndpoint collection, endpoint, obj

  HTTP.methods obj

  return


for typeName, url of Apollos.api.endpoints
  Apollos.api.addEndpoint url.url, typeName
