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

  if not platform
    platform = Apollos.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when Apollos.name.toUpperCase()
      user or=
        emails: [ address: null ]
        services:
          password:
            bcrypt: null

      rockUser =
        UserName: user.emails[0].address
        # user may not have password if pulling from exterior service
        ApollosHash: user.services?.password?.bcrypt

      if user.rock
        rockUser.PersonId = user.rock.personId
        rockUser.Guid = user.rock.guid
        rockUser.Id = user.rock.userLoginId

      return rockUser

###

  Rock.user.delete

  @example delete a user from Rock

    Rock.user.delete Apollos.users.findOne()

  @param user [Object] an existing user document to be deleted

###
Rock.user.delete = (user) ->

  user = Rock.user.translate(user)

  if not user.Id
    return

  debug user, "id for delete is #{user.Id}"

  Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, result) ->
    if error
      debug "Rock delete failed:"
      debug error
      return

###

  Rock.user.update

  @example update a user on Rock

    Rock.user.update(userDoc)

  @param user [Object] User to update

###
Rock.user.update = (user) ->

  rockUser = Rock.user.translate(user)

  if not rockUser.Id or not rockUser.Guid
    Rock.user.create user
    return

  Rock.apiRequest "POST", "api/UserLogins/#{rockUser.Id}", rockUser,
    (error, result) ->
      if error
        debug "Rock update failed:"
        debug error
        return

      # TODO: There shouldn't be any data from this call, right?
      #Apollos.user.update result.data

###

  Rock.user.create

  @example create a user on Rock

    Rock.user.update()

  @param user [Object] User to create

###
Rock.user.create = (user) ->

  user = Rock.user.translate user

  Rock.apiRequest "POST", "api/UserLogins", user, (error, result) ->
    if error
      debug "Rock create failed:"
      debug error
      return

    Apollos.user.update result.data

###

  Rock.users

  @example return all users synced to Rock

    Rock.users()

  @todo write lookup

###
Rock.users = ->

  throw new Meteor.Error "Unimplemented", "This method is unimplemented!"

###

  Rock.users.refresh

  @example refesh all users from Rock

    Rock.user.refresh()

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.users.refresh = (throwErrors) ->

  Rock.refreshEntity "api/UserLogins", "user", "users", throwErrors
