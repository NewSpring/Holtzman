baseURL = "api/v1/"
userURL = "#{baseURL}userlogins/"
authURL = "#{baseURL}auth/"


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


api["#{userURL}"] =

  post: (data) ->

    console.log "API"

    this.setContentType jsonContentType

    if not authenticate.call this
      return handleAuthenticationError.call this

    userLogin = parseRequestData data, this.requestHeaders["content-type"]
    Apollos.upsertUserFromRock userLogin
    return


HTTP.methods api
