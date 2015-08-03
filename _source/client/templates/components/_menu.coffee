class Apollos.menu extends Apollos.Component

  @register "Apollos.menu"

  events: -> [
    "click .menu-item": @.close
    "click [data-modal]": @.renderModal
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

  renderModal: (event) ->
    self = @
    event.preventDefault()

    template = $(event.target).closest("[data-modal]").data "modal"
    modal = Apollos.Component.getComponent("Apollos.modal")
    modal = modal.renderComponent()

    @.close()

    modal = Blaze.renderWithData(
      modal
      { template: template }
      document.body.getElementsByClassName('global-nav-offset')[0]
    )
