

class Apollos.profile.onBoard extends Apollos.Component

  @register "Apollos.profile.onBoard"

  @card true, "profile.signIn"

  vars: -> [
    email: ""
  ]

  onRendered: ->

    if Session.get "resetPasswordToken"
      @.state.set "profile.resetPassword"

  dismiss: ->
    self = @
    self.parent().destroy?()
