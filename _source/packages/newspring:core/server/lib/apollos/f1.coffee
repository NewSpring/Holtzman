OAuth = Npm.require("oauth").OAuth
Future = Npm.require "fibers/future"


oAuthCreated = false
f1 = -> return

class _F1Session

  constructor: ->

    oAuthCreated = true


    consumerKey = Meteor.settings.f1.consumerKey
    consumerSecret = Meteor.settings.f1.consumerSecret
    version = "1.0A"
    signatureMethod = "HMAC-SHA1"
    headers =
      Accept: "application/json"
      "Content-type": "application/json"


    @.oauthClient = new OAuth(
      null
      null
      consumerKey
      consumerSecret
      version
      null
      signatureMethod
      null
      headers
    )

  authenticate: (username, password) =>

    future = new Future()

    baseUrl = Meteor.settings.f1.baseURL
    url = "#{baseUrl}v1/WeblinkUser/AccessToken"
    body = Rock.utilities.base64Encode("#{username} #{password}")


    @.oauthClient.post url, null, null, body, "application/json", (error) ->
      if error
        future.return false
        return
      # if error
      #   throw new Meteor.Error error
      #   return

      future.return true

    return future.wait()




###

  Apollos.user.login.f1

  @example returns true if the given username and password authenticate
    successfully on the FellowshipOne API, false otherwise

    isSuccess = Apollos.user.login.f1 "bob@example.com", "password123"

  @param username [String] an email or other user identifier used on F1
  @param password [String] the password used to authenticate the given user

  See F1 API documentation followed here:
  https://developer.fellowshipone.com/docs/v1/Util/AuthDocs.help#2creds

###

Apollos.user.login.f1 = (username, password) ->

  if not oAuthCreated
    f1 = new _F1Session()

  try
    authenticated = f1.authenticate username, password

    return authenticated

  catch error
    debug error
    throw new Meteor.Error(error)


###

  Apollos.user.login.f1.hasAccount

  @example returns true if the given email previously was associated with a F1
    account

    hasF1Account = Apollos.user.login.f1.hasAccount "bob@example.com"

  @param email [String] an email used on F1
  @param callback [Function] a function to be called with a single parameter of
    hasF1Account. Omit to run synchronously.

###
Apollos.user.login.f1.hasAccount = (email, callback) ->
  # TODO - This method needs to do something other than return true!!!
  # TODO - Can we refactor this to be synchronously tested and return a boolean?

  future = new Future()

  Meteor.setTimeout ->
    hasAccount = false
    if not callback
      future.return hasAccount
    else
      callback hasAccount
  , 250

  if not callback
    return future.wait()




Meteor.methods
  "Apollos.user.login.f1": Apollos.user.login.f1
