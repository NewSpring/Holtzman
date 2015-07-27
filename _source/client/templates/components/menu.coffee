class Apollos.menu extends Apollos.Component

  @register "Apollos.menu"

  signedIn: ->
    return Meteor.userId() or Meteor.loggingIn()

  contextMenuTemplate: ->
    self = @
    return self.data().contextMenuTemplate
