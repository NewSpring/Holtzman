
###

  Apollos.user

  @example get the currently logged in user

    console.log Apollos.user()._id

###
Apollos.user = (id) ->

  if Meteor.isServer
    return {}

  if Meteor.isClient
    user = Meteor.user()

  return user or {}


###

  Apollos.user.create

  @example create a new user

    Apollos.user.create "xyz@abc.cc", "password1", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param password is the plain-text password the user will authenticate with
  @param callback is the function that will be called with an error if so

###
Apollos.user.create = (email, password, callback) ->

  Accounts.createUser
    email: email
    password: password
  ,
    callback



###

  Apollos.user.forgotPassword

  @example request a forgot password email

    Apollos.user.forgotPassword "xyz@abc.cc", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param callback is the function that will be called with an error if so

###
Apollos.user.forgotPassword = (email, callback) ->

  return Accounts.forgotPassword
    email: email
  ,
    callback




###

  Apollos.user.resetPassword

  @example changes password using reset token

    Apollos.user.resetPassword token, newPassword, (error) ->
      if error
        console.log error

  @param token is the reset token emailed to the user
  @param newPassword is what to change the password to
  @param callback is the function that will be called with an error if so

###
Apollos.user.resetPassword = (token, newPassword, callback) ->

  return Accounts.resetPassword token, newPassword, callback


if Meteor.isServer
  # TODO this is not secure
  Apollos.emailTemplates = Accounts.emailTemplates



###

  Apollos.user.changePassword

  @example changes password using old password

    Apollos.user.changePassword oldPassword, newPassword, (error) ->
      if error
        console.log error

  @param oldPassword is the user's current password
  @param newPassword is what to change the password to
  @param callback is the function that will be called with an error if so

###
Apollos.user.changePassword = (oldPassword, newPassword, callback) ->

  return Accounts.changePassword oldPassword, newPassword, callback
