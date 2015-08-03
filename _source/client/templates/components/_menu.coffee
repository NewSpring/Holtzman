class Apollos.menu extends Apollos.Component

  @register "Apollos.menu"

  events: -> [
    "click .menu-item": @.close
  ]

  onCreated: ->
    $("#primary-icon").removeClass("newspring--icon").addClass "text-large one-whole fa fa-close"

  onDestroyed: ->
    $("#primary-icon").removeClass("text-large one-whole fa fa-close").addClass "newspring--icon"

  signedIn: ->
    return Meteor.userId() or Meteor.loggingIn()

  contextMenuTemplate: ->
    self = @
    return self.data().contextMenuTemplate

  close: ->
    self = @
    self.parent().destroy()
