###

  The theme of this file is to provide methods that make Apollos (the core
  part since we're within the core package) do something

###


###
  Client and Server Code Starts Here
###

Apollos.name = "Apollos"


Apollos.user = ->
  user = Meteor.user()

  if !user
    user = {}

  return user


Apollos.user.create = (email, password, callback) ->

  if !Meteor.isClient
    callback = undefined

  Accounts.createUser
    email: email
    password: password
  ,
    callback

  return




Apollos.users = Meteor.users

###

  Server Only Code Starts Here

###

if not Meteor.isServer
  return


###

  Apollos.user.translate

  @example take data from a service and format it for Apollos

    Apollos.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.user.translate = (user, platform) ->

  # Default to Rock
  if !platform
    platform = "Rock"



  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when "ROCK"
      # Grab existing user for merging if
      if user
        query =
          $or: [
            "rock.userLoginId": user.Id
          ]

        existingUser = Meteor.users.findOne(query)

        if !existingUser then existingUser = {}
      else
        existingUser = Apollos.user()
        user = Rock.user()


      # add rock property
      existingUser.rock = existingUser.rock or {}

      # map properties from Rock to Apollos
      existingUser.rock.personId = user.PersonId
      existingUser.rock.guid = user.Guid
      existingUser.rock.userLoginId = user.Id

      # If we are forcing usernames
      if Apollos.validate.isEmail user.UserName
        existingUser.emails = existingUser.emails or []
        existingUser.emails[0] = existingUser.emails[0] or {}
        existingUser.emails[0].address = user.UserName

      # forcing bcrypt hashing
      if Apollos.validate.isBcryptHash user.ApollosHash
        existingUser.services = existingUser.services or {}
        existingUser.services.password = existingUser.services.password or {}
        existingUser.services.password.bcrypt = user.ApollosHash

      return existingUser



Apollos.user.update = (user) ->

  user = Apollos.user.translate(user)

  query =
    $or: [
      "rock.userLoginId": user.rock.userLoginId
    ]

  if user.emails and user.emails[0] and user.emails[0].address
    hasEmail = true
    query["$or"].push
      "emails.address": user.emails[0].address

  users = Meteor.users.find(query).fetch()


  if users.length > 1
    ids = []

    users.forEach (usr) ->
      ids.push usr._id

    throw new Meteor.Error "Rock sync issue", "User doc ids #{ids.join ", "}
      need investigated because they seem to be duplicates"

  else if users.length is 0 and hasEmail
    tempPassword = String(Date.now() * Math.random())
    userId = Apollos.user.create user.emails[0].address, tempPassword
    usr = Meteor.users.findOne userId

  else
    usr = users[0]

  user.updatedBy = "Rock"

  # can't upsert with _id present
  delete user._id

  if usr

    Meteor.users.update
      _id: usr._id
    ,
      $set: user



###

  Update bindings

###

# created
Apollos.users.after.insert (userId, doc) ->
  if doc.updatedBy isnt "Rock"
    Rock.user.create doc

# updated
Apollos.users.after.update (userId, doc) ->

  if doc.updatedBy isnt "Rock"
    Rock.user.update doc

# deleted
Apollos.users.after.remove (userId, doc) ->
  if doc.updatedBy isnt "Rock"
    Rock.user.delete doc
