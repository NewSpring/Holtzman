baseURL = "api/v1/"
usersURL = "#{baseURL}userlogins/"
peopleURL = "#{baseURL}people/"

jsonContentType = "application/JSON"
tokenName = Meteor.settings.api.tokenName
token = Meteor.settings.api.token
api = {}

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

  sentToken = @.requestHeaders[tokenName]
  return sentToken is token

###

  deleteResource

  @example authenticates and then calls the delete handler

    return deleteResource.call @, Apollos.person.delete, Rock.name

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

    return upsertResource.call @, data, Apollos.person.update, Rock.name

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

api["#{usersURL}:id"] =

  post: (data) ->

    return upsertResource.call @, data, Apollos.user.update, Rock.name

  delete: (data) ->

    ###

      @question
        Should this simply disable the user? Do we ever want to
        have a delete option? I guess it could delete the login portion
        which is what it is doing now. Food for thought

    ###

    return deleteResource.call @, Apollos.user.delete, Rock.name

api["#{peopleURL}:id"] =

  post: (data) ->

    return upsertResource.call @, data, Apollos.person.update, Rock.name

  delete: (data) ->

    return deleteResource.call @, Apollos.person.delete, Rock.name

HTTP.methods api
