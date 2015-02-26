Rock.name = "Rock"


Rock.isAlive = ->
  serverWatch.isAlive Rock.name


if not Meteor.isServer
  return


Rock.tokenName = Meteor.settings.rock.tokenName
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.token = Meteor.settings.rock.token


if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000


Rock.refreshUserLogins = ->

  headers = {}
  headers[Rock.tokenName] = Rock.token

  HTTP.get "#{Rock.baseURL}api/UserLogins",
    timeout: 2500
    headers: headers
  , (error, result) ->
    if error
      console.log error
      return

    userLogins = result.data

    for userLogin in userLogins
      Apollos.upsertUserFromRock userLogin


Meteor.users.after.insert (userId, doc) ->
  return
Meteor.users.after.update (userId, doc) ->
  return
Meteor.users.after.remove (userId, doc) ->
  return


Meteor.startup Rock.refreshUserLogins
