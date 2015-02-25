Rock.name = "Rock"


Rock.isAlive = ->
  serverWatch.isAlive Rock.name


if not Meteor.isServer
  return


rockToken = null
Rock.username = Meteor.settings.rock.username
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.password = Meteor.settings.rock.password


if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000


Rock.getToken = (callback) ->

  if rockToken
    callback rockToken
    return

  Rock.refreshToken (result) ->
    rockToken = result.token
    callback rockToken


Rock.refreshToken = (callback) ->

  credentials =
    Username: Rock.username
    Password: Rock.password
    Persisted: true

  HTTP.post "#{Rock.baseURL}api/Auth/Login",
    timeout: 5000
    data: credentials
  , (error, result) ->
    if error
      callback
        error: error
      return

    if not (result and result.statusCode is 204)
      callback
        error: result
      return

    tokenAndExpire = result.headers["set-cookie"][0].replace ".ROCK=", ""
    indexOfSemicolon = tokenAndExpire.indexOf ";"
    rockToken = tokenAndExpire.substring 0, indexOfSemicolon
    expire = tokenAndExpire.substring(indexOfSemicolon).replace "; expires=", ""
    indexOfComma = expire.indexOf ", "
    indexOfSemicolon = expire.indexOf ";"
    expire = expire.substring (indexOfComma + 2), indexOfSemicolon
    rockTokenExpires = new Date(expire)

    callback
      expires: rockTokenExpires
      token: rockToken


Meteor.users.after.insert (userId, doc) ->
  return
Meteor.users.after.update (userId, doc) ->
  return
Meteor.users.after.remove (userId, doc) ->
  return
