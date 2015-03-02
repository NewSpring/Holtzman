###

  The theme of this file is to provide methods that make Rock do something or
  get something from Rock

###


###
  Client and Server Code Starts Here
###

Rock.name = "Rock"


Rock.isAlive = ->

  serverWatch.isAlive Rock.name


###
  Server Only Code Starts Here
###

if not Meteor.isServer
  return


Rock.tokenName = Meteor.settings.rock.tokenName
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.token = Meteor.settings.rock.token


if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000


Rock.mapUserToUserLogin = (userDoc, userLogin) ->

  userLogin = userLogin or {}

  userLogin.PersonId = userDoc.rock.personId
  userLogin.Guid = userDoc.rock.guid
  userLogin.Id = userDoc.rock.userLoginId
  userLogin.UserName = userDoc.emails[0].address
  userLogin.ApollosHash = userDoc.services.password.bcrypt

  return userLogin


Rock.mapUserLoginToUser = (userLogin, userDoc) ->

  userDoc = userDoc or {}
  userDoc.rock = userDoc.rock or {}

  userDoc.rock.personId = userLogin.PersonId
  userDoc.rock.guid = userLogin.Guid
  userDoc.rock.userLoginId = userLogin.Id

  if Apollos.Validation.isEmail userLogin.UserName
    userDoc.emails = userDoc.emails or []
    userDoc.emails[0] = userDoc.emails[0] or {}
    userDoc.emails[0].address = userLogin.UserName

  if Apollos.Validation.isBcryptHash userLogin.ApollosHash
    userDoc.services = userDoc.services or {}
    userDoc.services.password = userDoc.services.password or {}
    userDoc.services.password.bcrypt = userLogin.ApollosHash

  return userDoc


Rock.checkUserLogin = (userLogin) ->

  check userLogin,
    PersonId: Number
    Guid: String
    Id: Number
    UserName: String
    ApollosHash: String

  return true


Rock.apiRequest = (method, resource, data, callback) ->

  if typeof data is "function"
    callback = data
    data = undefined

  headers = {}

  if Rock.tokenName and Rock.token
    headers[Rock.tokenName] = Rock.token

  HTTP.call method, "#{Rock.baseURL}#{resource}",
    timeout: 2500
    headers: headers
    data: data
  , callback


Rock.createUserLogin = (userDoc) ->

  userLogin = Rock.mapUserToUserLogin userDoc

  Rock.apiRequest "POST", "api/UserLogins", userLogin, (error) ->
    if error
      console.log error
      return


Rock.refreshUserLogins = ->

  Rock.apiRequest "GET", "api/UserLogins", (error, result) ->
    if error
      console.log error
      return

    userLogins = result.data

    for userLogin in userLogins
      Apollos.upsertUserFromRock userLogin


Meteor.users.after.insert (userId, doc) ->
  Rock.createUserLogin doc

Meteor.users.after.update (userId, doc) ->
  return

Meteor.users.after.remove (userId, doc) ->
  return


Meteor.startup Rock.refreshUserLogins
