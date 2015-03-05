###

  The theme of this file is to listen for API requests

###

if !Meteor.server
  return

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
    console.log data, "norma"
    this.setContentType jsonContentType

    if not authenticate.call this
      return handleAuthenticationError.call this

    userLogin = parseRequestData data, this.requestHeaders["content-type"]
    Apollos.user.update userLogin
    return

    delete: (data) ->
      console.log data, "delete normal"

      this.setContentType jsonContentType

      if not authenticate.call this
        return handleAuthenticationError.call this

      user = parseRequestData data, this.requestHeaders["content-type"]
      ###

        @question
          Should this simply disable the user? Do we ever want to
          have a delete option? I guess it could delete the login portion
          which is what it is doing now. Food for thought

      ###

      user = Rock.user.translate(user, "apollos")
      Apollos.user.delete user


api["#{userURL}:id"] =


  post: (data) ->
    console.log data, "id"
    this.setContentType jsonContentType

    if not authenticate.call this
      return handleAuthenticationError.call this

    userLogin = parseRequestData data, this.requestHeaders["content-type"]
    Apollos.user.update userLogin
    return


  delete: (data) ->

    console.log data, "delete :id"

    this.setContentType jsonContentType

    if not authenticate.call this
      return handleAuthenticationError.call this

    user = parseRequestData data, this.requestHeaders["content-type"]
    ###

      @question
        Should this simply disable the user? Do we ever want to
        have a delete option? I guess it could delete the login portion
        which is what it is doing now. Food for thought

    ###

    user = Rock.user.translate(user, "apollos")
    Apollos.user.delete user



HTTP.methods api
