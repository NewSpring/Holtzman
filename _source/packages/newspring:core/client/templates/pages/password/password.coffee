doneCallback = null

Accounts.onResetPasswordLink (token, done) ->
  Session.set "resetPasswordToken", token
  Router.go "resetPassword"
  doneCallback = done

Template.forgotPassword.events

  "submit #forgot-password": ->
    email = $("input[name=email]").val()
    if Apollos.validate.isEmail email
      Apollos.user.forgotPassword email
    return false

Template.resetPassword.helpers

  resetPasswordToken: ->
    return Session.get "resetPasswordToken"

Template.resetPassword.rendered = ->

  # use if navigating away from reset password page
  sessionReset = ->

Template.resetPassword.events

  "submit #reset-password": (e) ->
    e.preventDefault()

    token = Session.get "resetPasswordToken"
    newPassword = $('input[name=new-password]').val()

    Apollos.user.resetPassword token, newPassword, (error) ->
      if error
        console.log(error)
      else
        Session.set "resetPasswordToken", ""
        doneCallback()
        Router.go "home"
