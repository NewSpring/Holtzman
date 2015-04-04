OAuth = Npm.require("oauth").OAuth
Future = Npm.require "fibers/future"

###

  Apollos.checkF1Credentials

  @example returns true if the given username and password authenticate
    successfully on the FellowshipOne API, false otherwise

    isSuccess = Apollos.checkF1Credentials "bob@example.com", "password123"

  @param username [String] an email or other user identifier used on F1
  @param password [String] the password used to authenticate the given user
  @param callback [Function] a function to be called with a single parameter of
    isSuccess. Omit to run synchronously.

###
Apollos.checkF1Credentials = (username, password, callback) ->

  baseUrl = Meteor.settings.f1.baseURL
  json = "application/json"
  future = new Future()

  # Create an OAuth client
  requestUrl = null
  accessUrl = null
  consumerKey = Meteor.settings.f1.consumerKey
  consumerSecret = Meteor.settings.f1.consumerSecret
  version = "1.0A"
  authorizeCallback = null
  signatureMethod = "HMAC-SHA1"
  nonceSize = null
  headers =
    Accept: json
    "Content-type": json

  oauthClient = new OAuth requestUrl, accessUrl, consumerKey, consumerSecret,
    version, authorizeCallback, signatureMethod, nonceSize, headers

  # Make the request using the client
  url = "#{baseUrl}v1/WeblinkUser/AccessToken"
  token = null
  tokenSecret = null
  body = Rock.utilities.base64Encode("#{username} #{password}")
  contentType = json

  oauthClient.post url, token, tokenSecret, body, contentType, (error) ->
    isSuccess = not error?
    if not callback
      future.return isSuccess
    else
      callback isSuccess

  if not callback
    return future.wait()


Meteor.methods
  "Apollos.checkF1Credentials": Apollos.checkF1Credentials
