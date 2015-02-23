baseURL = "api/v1/"
userURL = "#{baseURL}userlogins/"
authURL = "#{baseURL}auth/"


jsonContentType = "application/JSON"
tokenName = Meteor.settings.api.tokenName
tokenSecret = Meteor.settings.api.secret
tokenHoursUntilExpiration = Meteor.settings.api.tokenHoursUntilExpiration
api = {}


handleBadRequestError = ->
  this.setStatusCode(400)
  return


handleAuthenticationError = ->
  this.setStatusCode(401)
  return


authenticateAsRockAdmin = ->
  result = authenticate.call this

  if not (result and result.user and result.user.rock and result.user.rock.isAdmin)
    return false

  return result


authenticate = ->
  token = this.requestHeaders[tokenName]

  if not token?
    return false

  decodedData = apiToken.decode token, tokenSecret

  if not decodedData?
    return false

  user = Meteor.users.findOne decodedData.userId

  if not user?
    return false

  return {
    user: user
    expires: decodedData.expires
  }


api["#{userURL}:userLoginId"] =

  post: (data) ->

    this.setContentType jsonContentType
    result = authenticateAsRockAdmin.call this

    if not result
      return handleAuthenticationError.call this

    userLoginId = Number this.params.userLoginId
    data = parseRequestData data, this.requestHeaders["content-type"]
    data.personAliasId = Number data.personAliasId

    try
      check data,
        password: String
        personAliasId: Number
        userName: String
    catch error
      return handleBadRequestError.call this

    user = Meteor.users.findOne
      "rock.userLoginId": userLoginId

    if not user

      duplicate = Meteor.users.findOne
        "emails.address": data.userName

      if duplicate
        return handleBadRequestError.call this

      tempPassword = String(Date.now() * Math.random())

      userId = Accounts.createUser
        email: data.userName
        password: tempPassword

      user = Meteor.users.findOne userId

    user.services.password.bcrypt = data.password
    user.rock = user.rock or {}
    user.rock.userLoginId = userLoginId
    user.rock.personAliasId = data.personAliasId

    currentEmail = user.emails[0].address

    if data.userName isnt currentEmail
      user.emails[0].address = data.userName
      user.emails[0].verified = false

    Meteor.users.update
      _id: user._id
    ,
      user

    return


api["#{authURL}"] =

  get: ->

    this.setContentType jsonContentType
    authResult = authenticate.call this

    resultKey = "Apollos, who am I?"
    result = {}
    result[resultKey] = "I have no idea!"

    if not (authResult and authResult.user)
      return JSON.stringify result

    expires = authResult.expires
    email = authResult.user.emails[0].address

    result[resultKey] = "You are #{email} and your token expires #{expires}"
    return JSON.stringify result


  post: (data) ->

    this.setContentType jsonContentType
    data = parseRequestData data, this.requestHeaders["content-type"]

    try
      check data,
        email: String
        password: String
    catch error
      return handleBadRequestError.call this

    encodedData = apiToken.encode data.email, data.password,
      tokenSecret, tokenHoursUntilExpiration

    if not encodedData?
      return handleAuthenticationError.call this

    return JSON.stringify
      token: encodedData.token
      expires: encodedData.expires
      instructions: "Put the token in the header of your API requests as the key
        #{tokenName}"


HTTP.methods api
