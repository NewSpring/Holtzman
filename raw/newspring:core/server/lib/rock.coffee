

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

  Rock.apiRequest

  @example make an API call to Rock

    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err

      console.log data

  @param method [String] CRUD Method desired
  @param resource [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response

###
Rock.apiRequest = (method, resource, data, callback) ->

  if !Rock.isAlive()
    # build queue system here!
    return

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
    platform = Apollos.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when "APOLLOS"
      if !user
        user = Apollos.user()

      rockUser =
        UserName: user.emails[0].address
        ApollosHash: user.services.password.bcrypt

      if user.rock
        rockUser.PersonId = user.rock.personId
        rockUser.Guid = user.rock.guid
        rockUser.Id = user.rock.userLoginId

      return rockUser




###

  Rock.user.check

  @example verify account information is correct

    Rock.user.check([obj])

  @param user [Object] existing object to be validated

###
Rock.user.check = (user) ->

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
    debug e
    return false




###

  Rock.user.delete

  @example make an API call to Rock

    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err

      console.log data

  @param method [String] CRUD Method desired
  @param resource [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response

###
Rock.user.delete = (user) ->


  user = Rock.user.translate(user)

  Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error) ->
    if error
      debug "Rock delete failed:"
      debug error
      return



###

  Rock.user.update

  @example update a user on Rock

    Rock.user.update()

  @param user [Object] User to update

###
Rock.user.update = (user) ->

  rockUser = Rock.user.translate(user)

  if !rockUser.PersonId or !rockUser.Guid or !rockUser.Id
    Rock.user.create user
    return

  rockUser = Rock.user.check user

  Rock.apiRequest "POST", "api/UserLogins/#{rockUser.Id}", rockUser, (error) ->
    if error
      debug "Rock update failed:"
      debug error
      return




###

  Rock.user.create

  @example create a user on Rock

    Rock.user.update()

  @param user [Object] User to create

###
Rock.user.create = (user) ->


  user = Rock.user.translate(user)

  Rock.apiRequest "POST", "api/UserLogins", user, (error) ->
    if error
      debug "Rock create failed:"
      debug error
      return



###

  Rock.users

  @example return all users synced to Rock

    Rock.users()

  @todo write lookup

###
Rock.users = ->

  # Apollos.users.find([])
  return


###

  Rock.users.refresh

  @example refesh all users from Rock

    Rock.user.refresh()

  @param throwErrors [Boolean] switch to silence error throwing

###
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
