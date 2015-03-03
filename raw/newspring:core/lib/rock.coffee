###

  The theme of this file is to provide methods that make Rock do something or
  get something from Rock

###


###
  Client and Server Code Starts Here
###

Rock.name = "Rock"


###

  Rock.isAlive

  @example See if Rock is online
    if (Rock.isAlive())
      debug "its alive!"


###
Rock.isAlive = ->

  serverWatch.isAlive(Rock.name)


###

  Client Only

###

if Meteor.isClient

  Template.registerHelper("Rock", Rock)




###

  Server Only Code Starts Here

###

if not Meteor.isServer
  return


# Bind variabls to Rock
Rock.tokenName = Meteor.settings.rock.tokenName
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.token = Meteor.settings.rock.token

# If Rock is being watched (aka old states), remove watching
if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

# Start watching again
serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000


###

  Rock.user

  @example return current logged in user in Rock format

    rockUser = Rock.user()


###
Rock.user = ->

  Rock.user.translate()




###

  Rock.user.translate

  @example take data from a service and format it for Rock

    Rock.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Rock.user.translate = (user, platform) ->

  if !platform
    platform = "Apollos"

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when "APOLLOS"
      if !user
        user = Apollos.user()

      rockUser =
        PersonId: user.rock.personId
        Guid: user.rock.guid
        Id: user.rock.userLoginId
        UserName: user.emails[0].address
        ApollosHash: user.services.password.bcrypt

      return rockUser




###

  Rock.user.checkAccount

  @example verify account information is correct

    Rock.user.checkAccount([obj])

  @param user [Object] existing object to be validated

###
Rock.user.checkAccount = (user) ->

  if !user
    user = Rock.user.translate()

  try
    check user,
      PersonId: Number
      Guid: String
      Id: Number
      UserName: String
      ApollosHash: String

    return true
  catch e
    return false


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


Rock.user.delete = (user) ->


  user = Rock.user.translate(user)

  Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error) ->
    if error
      debug "Rock delete failed:"
      debug error
      return


Rock.user.update = (user) ->

  user = Rock.user.translate(user)

  Rock.apiRequest "POST", "api/UserLogins/#{user.Id}", userLogin, (error) ->
    if error
      debug "Rock update failed:"
      debug error
      return


Rock.user.create = (user) ->

  user = Rock.user.translate(user)

  Rock.apiRequest "POST", "api/UserLogins", user, (error) ->
    if error
      debug "Rock create failed:"
      debug error
      return


Rock.users = ->
  # Apollos.users.find([])
  return

Rock.users.refresh = (throwErrors) ->

  Rock.apiRequest "GET", "api/UserLogins", (error, result) ->
    if error and throwErrors
      throw new Meteor.Error "Rock sync issue", error
    else if error
      debug "Rock sync failed:"
      debug error
      return

    users = result.data

    for user in users
      Apollos.user.update user


Apollos.users.after.insert (userId, doc) ->
  if doc.updatedBy isnt "Rock"
    Rock.user.create doc

Apollos.users.after.update (userId, doc) ->

  if doc.updatedBy isnt "Rock"
    Rock.user.update doc

Apollos.users.after.remove (userId, doc) ->
  if doc.updatedBy isnt "Rock"
    Rock.user.delete doc


Meteor.startup ->
  debug "Attempting to sync data from Rock"
  Rock.users.refresh true
