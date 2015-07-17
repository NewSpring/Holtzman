
doneCallback = null

# Stub for right now
Accounts.onResetPasswordLink (token, done) ->
  Session.set "resetPasswordToken", token
  doneCallback = done


class profile.resetPassword extends Apollos.Component

  @register "profile.resetPassword"
  @card "Apollos.profile.onBoard"
  url: -> "reset-password"

  vars: -> [

    hasErrors: false

  ]

  "resetPasswordToken": ->
    return Session.get "resetPasswordToken"


  onRendered: ->

    # use if navigating away from reset password page
    sessionReset = ->
      return


  events: -> [

    "submit #reset-password": (event) ->

      self = @
      event.preventDefault()
      children = {}
      for child in self.children("Apollos.Forms.Input")
        children[child.data().name] = child


      token = Session.get "resetPasswordToken"
      password = self.find("input[name=password]").value
      confirmPassword = self.find("input[name=confirmPassword]").value

      if not password
        self.hasErrors.set true
        children["password"].setStatus "Password cannot be empty", true
        return

      if not confirmPassword
        self.hasErrors.set true
        children["confirmPassword"].setStatus "Password cannot be empty", true
        return

      if password isnt confirmPassword
        self.hasErrors.set true
        children["confirmPassword"].setStatus "Passwords must match", true
        return

      Apollos.user.resetPassword token, password, (error) ->
        if error

          self.hasErrors.set true

          # token expired
          if error.error is 403
            children["password"].setStatus "This reset link has expired", true

        else
          Session.set "resetPasswordToken", ""
          doneCallback()
          Apollos.Router.go "/"
  ]
