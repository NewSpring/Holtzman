###

  The theme of this file is to listen for API requests

###

if !Meteor.server
  return

baseURL = "api/v1/"
userURL = "#{baseURL}userlogins/"
personURL = "#{baseURL}people/"


jsonContentType = "application/JSON"
tokenName = Meteor.settings.api.tokenName
token = Meteor.settings.api.token
api = {}


handleBadRequestError = ->
  this.setStatusCode(400)
  return


handleAuthenticationError = ->
  this.setStatusCode(401)
  return


authenticate = ->
  sentToken = this.requestHeaders[tokenName]
  return sentToken is token


deleteResource = (handlerFunc, platform) ->

  @.setContentType jsonContentType

  if not authenticate.call @
    return handleAuthenticationError.call @

  id = Number @.params.id
  handlerFunc id, platform


upsertResource = (data, handlerFunc, platform) ->

  @.setContentType jsonContentType

  if not authenticate.call @
    return handleAuthenticationError.call @

  resource = parseRequestData data, @.requestHeaders["content-type"]

  if !resource
    resource = {}

  resource.Id = Number @.params.id
  handlerFunc resource, platform
  return


api["#{userURL}:id"] =

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


###
api["#{personURL}:id"] =

  post: (data) ->
    return upsertResource.call @, data, Apollos.person.update, Rock.name

  delete: (data) ->
    return deleteResource.call @, Apollos.person.delete, Rock.name
###


HTTP.methods api
