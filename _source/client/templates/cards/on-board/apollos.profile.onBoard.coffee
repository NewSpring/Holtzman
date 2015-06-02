

class Apollos.profile.onBoard extends Apollos.Component

  @register "Apollos.profile.onBoard"
  @card true, "profile.signIn"

  vars: -> [
    email: ""
  ]

  contentBlock: -> @._internals.templateInstance.view.templateContentBlock
  elseBlock: -> @._internals.templateInstance.view.templateElseBlock

  onRendered: ->

    if Session.get "resetPasswordToken"
      @.state.set "profile.resetPassword"
