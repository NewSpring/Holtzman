class onboard extends Apollos.Component

  @register "onboard"

  template: "onboard"

  vars: -> [
    passwordForget: false
    email: ""
  ]

  resetPasswordToken: ->
    Session.get "resetPasswordToken"
