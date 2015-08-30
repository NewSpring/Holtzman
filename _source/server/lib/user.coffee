
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
  orArray = []

  if user.rock?.userLoginId
    orArray.push "rock.userLoginId": user.rock.userLoginId
  if user.rock?.guid
    orArray.push "rock.guid": new RegExp(user.rock.guid, "i")
  if user.emails?[0]?.address
    hasEmail = true
    orArray.push "emails.address": user.emails[0].address

  if not orArray.length
    Apollos.debug "Discarding unidentifiable user document intended for update",
      user
    return

  query = $or: orArray
  users = Apollos.users.find query

  if users.count() > 1
    ids = users.map (u) -> u._id

    throw new Meteor.Error "Rock sync issue", "User doc ids #{ids.join ", "}
      need investigated because they seem to be duplicates"

  else if users.count() is 0 and hasEmail
    tempPassword = String(Date.now() * Math.random())
    userId = Apollos.user.create(user.emails[0].address, tempPassword)
    usr = Apollos.users.findOne userId

  else
    usr = users.fetch()[0]

  if platform
    user.updatedBy = platform.toUpperCase()
  else
    user.updatedBy = Apollos.name

  # can't upsert with _id present
  delete user._id

  if usr

    Apollos.users.update
      _id: usr._id
    ,
      $set: user

    return usr._id
