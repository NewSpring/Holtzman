class Apollos.nav.fixed extends Apollos.Component

  @register "Apollos.nav.fixed"

  events: -> [
    "click [data-menu]": @.handleMenuClick
  ]

  handleMenuClick: (event) ->
    self = @
    menuOpen = document.getElementById "the-menu"

    if menuOpen
      self.hideMenu event
    else
      self.showMenu event

  hideMenu: (event) ->
    self = @
    event.preventDefault()
    menuElement = document.getElementById "the-menu"
    menuComponent = Apollos.Component.getComponentForElement menuElement
    menuComponent.parent().destroy()

  showMenu: (event) ->
    self = @
    event.preventDefault()

    modal = Apollos.Component.getComponent("Apollos.modal")
    modal = modal.renderComponent()

    data =
      contextMenuTemplate: "giveContextMenu"
      template: "Apollos.menu"
      verticalAlign: "top"

    container = document.body.getElementsByClassName('global-nav-offset')[0]
    Blaze.renderWithData modal, data, container
