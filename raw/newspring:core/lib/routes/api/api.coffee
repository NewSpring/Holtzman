###

  The theme of this file is to listen for API requests

###


baseURL = "api/v1/"
userURL = "#{baseURL}userlogins/"


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


api[userURL] =

  post: (data) ->

    this.setContentType jsonContentType

    if not authenticate.call this
      return handleAuthenticationError.call this

    userLogin = parseRequestData data, this.requestHeaders["content-type"]
    Apollos.user.update userLogin
    return


api["#{userURL}:id"] =

  post: (user) ->

    user = Rock.user.translate(user, "apollos")
    Apollos.user.create user


  delete: (user) ->

    ###

      @question
        Should this simply disable the user? Do we ever want to
        have a delete option? I guess it could delete the login portion
        which is what it is doing now. Food for thought
    
    ###

    user = Rock.user.translate(user, "apollos")
    Apollos.user.delete user



# HTTP.methods api
