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



api["#{userURL}:id"] =


  post: (data) ->

    @.setContentType jsonContentType

    if not authenticate.call @
      return handleAuthenticationError.call @

    userLogin = parseRequestData data, @.requestHeaders["content-type"]

    if !userLogin
      userLogin =
        Id: @.params.id

    Apollos.user.update userLogin, Rock.name
    return


  delete: (data) ->

    @.setContentType jsonContentType

    if not authenticate.call @
      return handleAuthenticationError.call @

    user = parseRequestData data, @.requestHeaders["content-type"]
    ###

      @question
        Should this simply disable the user? Do we ever want to
        have a delete option? I guess it could delete the login portion
        which is what it is doing now. Food for thought

    ###

    user = Apollos.users.findOne("rock.userLoginId": Number(@.params.id) )

    # user = Rock.user.translate(user, Apollos.name)
    Apollos.user.delete user, Rock.name



HTTP.methods api
