class Apollos.nav.fixed extends Apollos.Component

  @register "Apollos.nav.fixed"

  events: -> [
    "click [data-menu]": @.showMenu
  ]

  showMenu: (event) ->
    self = @
    event.preventDefault()

    modal = Apollos.Component.getComponent("Apollos.modal")
    modal = modal.renderComponent()

    data =
      contextMenuTemplate: "giveContextMenu"
      template: "Apollos.menu"

    container = document.body.getElementsByClassName('global-nav-offset')[0]

    modal = Blaze.renderWithData modal, data, container
