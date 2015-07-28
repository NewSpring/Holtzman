class Apollos.menu extends Apollos.Component

  @register "Apollos.menu"

  events: -> [
    "click .menu-item": @.close
  ]

  signedIn: ->
    return Meteor.userId() or Meteor.loggingIn()

  contextMenuTemplate: ->
    self = @
    return self.data().contextMenuTemplate

  close: ->
    self = @
    self.parent().destroy()
