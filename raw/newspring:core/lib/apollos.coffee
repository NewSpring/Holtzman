###

  The theme of this file is to provide methods that make Apollos (the core
  part since we're within the core package) do something

###


###
  Client and Server Code Starts Here
###

Apollos.name = "Apollos"


Apollos.createUser = (email, password, callback) ->

  if !Meteor.isClient
    callback = undefined

  Accounts.createUser
    email: email
    password: password
  ,
    callback

  return


###
  Server Only Code Starts Here
###

if not Meteor.isServer
  return


Apollos.upsertUserFromRock = (userLogin) ->

  mappedDoc = Rock.mapUserLoginToUser userLogin
  query =
    $or: [
      "rock.userLoginId": mappedDoc.rock.userLoginId
    ]

  if mappedDoc.emails and mappedDoc.emails[0] and mappedDoc.emails[0].address
    hasEmail = true
    query["$or"].push
      "emails.address": mappedDoc.emails[0].address

  users = Meteor.users.find(query).fetch()

  if users.length > 1
    ids = []

    users.forEach (user) ->
      ids.push user._id

    throw new Meteor.Error "Rock sync issue", "User doc ids #{ids.join ", "}
      need investigated because they seem to be duplicates"

  else if users.length is 0 and hasEmail
    tempPassword = String(Date.now() * Math.random())
    userId = Apollos.createUser mappedDoc.emails[0].address, tempPassword
    user = Meteor.users.findOne userId

  else
    user = users[0]

  mappedDoc.updatedBy = "Rock"

  if user
    Meteor.users.update
      _id: user._id
    ,
      $set: mappedDoc
