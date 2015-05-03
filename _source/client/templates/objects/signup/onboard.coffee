class onboard extends Apollos.Component

  @register "onboard"

  vars: -> [
    passwordForget: false
    email: ""
  ]

  resetPasswordToken: ->
    Session.get "resetPasswordToken"
