
doneCallback = null

# Stub for right now
Accounts.onResetPasswordLink (token, done) ->
  Session.set "resetPasswordToken", token
  doneCallback = done



Template.resetPassword.onCreated ->

  self = @

  self.hasErrors = new ReactiveVar(false)

  self.password = new ReactiveVar({
    methods: null
    parent: self
  })

  self.confirmPassword = new ReactiveVar({
    methods: null
    parent: self
  })



Template.resetPassword.helpers

  "hasErrors": ->
    return Template.instance().hasErrors.get()

  "resetPasswordToken": ->
    return Session.get "resetPasswordToken"

  "password": ->
    return Template.instance().password

  "confirmPassword": ->
    return Template.instance().confirmPassword



Template.resetPassword.onRendered ->

  # use if navigating away from reset password page
  sessionReset = ->
    return


Template.resetPassword.events

  "submit #reset-password": (event, template) ->
    event.preventDefault()

    token = Session.get "resetPasswordToken"
    password = template.find("input[name=password]").value
    confirmPassword = template.find("input[name=confirmPassword]").value

    if not password
      template.hasErrors.set true
      passwordTemplate = template.password.get()
      passwordTemplate.methods.setStatus "Password cannot be empty", true
      return
    else if not confirmPassword
      template.hasErrors.set true
      confirmPasswordTemplate = template.confirmPassword.get()
      confirmPasswordTemplate.methods.setStatus "Password cannot be empty", true
      return
    else if password != confirmPassword
      template.hasErrors.set true
      confirmPasswordTemplate = template.confirmPassword.get()
      confirmPasswordTemplate.methods.setStatus "Passwords must match", true
      return

    Apollos.user.resetPassword token, password, (error) ->
      if error

        template.hasErrors.set true

        # token expired
        if error.error is 403
          passwordTemplate = template.password.get()
          passwordTemplate.methods.setStatus "This reset link has expired", true

      else
        Session.set "resetPasswordToken", ""
        doneCallback()
        Router.go "home"
