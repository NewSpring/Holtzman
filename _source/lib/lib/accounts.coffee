
Apollos._loginMethods = {}

if Meteor.isClient
  Apollos.loginWithPassword = (username, password, callback) ->


    self = @
    isAuthenticated = false
    args = Array.prototype.slice.call arguments

    baseLogin = ->
      Meteor.loginWithPassword.apply Meteor.loginWithPassword, args

    methods = Apollos._loginMethods

    if not Object.keys(methods).length
      baseLogin()

    for service, handle of methods

      authenticated = handle.apply handle, args

      if authenticated is undefined
        continue

      if authenticated is false
        isAuthenticated = true
        throw new Meteor.Error("login", "Wrong username or password")
        break

      # Each service should save username and password
      # after verifying third party
      if authenticated is true
        isAuthenticated = true
        baseLogin()
        break

    if not isAuthenticated
      baseLogin()

    return



if Meteor.isServer
  Meteor.methods(
    "Apollos.loginMethods": ->
      console.log "returning methods..."
      console.log Apollos._loginMethods
      return Apollos._loginMethods
  )



Apollos.removeLogin = (name) ->


  if Apollos._loginMethods[name]
    delete Apollos._loginMethods[name]

  return



Apollos.registerLogin = (name, loginMethod) ->


  self = @

  # should we allow overwriting here or force unique?
  # for debugging it would be a pain if we allowed overwriting
  if Apollos._loginMethods[name]

    throw new Meteor.Error("registerLogin", "This method for logging in is already established")

  if Meteor.isServer
    Meteor.methods {"Apollos.login.#{name}": loginMethod}
    return

  if Meteor.isClient
    Apollos._loginMethods[name] = ->

      args = Array.prototype.slice.call arguments

      call = ["Apollos.login.#{name}"]
      call = call.concat args

      Meteor.call.apply Meteor.call, call


  console.log Apollos._loginMethods

  return
