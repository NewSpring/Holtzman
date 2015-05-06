class Apollos.Profile.OnBoard extends Apollos.Component

  @register "Apollos.Profile.OnBoard"

  vars: -> [
    passwordForget: false
    email: ""
  ]

  resetPasswordToken: ->
    Session.get "resetPasswordToken"
