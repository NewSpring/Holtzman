

class Apollos.profile.onBoard extends Apollos.Component

  @register "Apollos.profile.onBoard"
  @card true

  vars: -> [
    state: "profile.signIn"
    email: ""
  ]

  resetPasswordToken: ->
    Session.get "resetPasswordToken"


  onCreated: ->
    console.log "foobar"
