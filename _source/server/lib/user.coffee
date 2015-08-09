
Apollos.user.hasAccount = (email) ->

  usr = Meteor.users.findOne({"emails.address": email})

  if usr
    return true

  return false


Meteor.methods(
  "Apollos.user.hasAccount": Apollos.user.hasAccount
)

###

  Apollos.user.translate

  @example take data from a service and format it for Apollos

    Apollos.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.user.translate = (user, platform) ->

  return Apollos.documentHelpers.translate "user", user, platform



###

  Apollos.user.delete

  @example take a user and delete it

    Apollos.user.delete(user, [platform])

  @param user [Object|String|Number] existing document, _id, or rock.userLoginId
  @param platform [String] platform initiating the delete

###
Apollos.user.delete = (user, platform) ->

  if typeof user is "number"
    entity = Apollos.users.findOne
      "rock.userLoginId": user

    if entity
      user = entity

  Apollos.documentHelpers.delete "user", "users", user, platform


###

  Apollos.user.update

  @example update a usr in apollos with data from Rock

    Apollos.user.update([obj, platform])

  @param user [Object] existing user from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.user.update = (user, platform) ->

  user = Apollos.user.translate user, platform

  if not user
    return

  if platform
    user.updatedBy = platform.toUpperCase()
  else
    user.updatedBy = Apollos.name


  Apollos.users.update(user._id, $set: user, (err, count) ->
    if err
      throw new Meteor.Error err
  )
