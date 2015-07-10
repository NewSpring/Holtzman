class Apollos.modal extends Apollos.Component

  @register "Apollos.modal"

  vars: -> [
    disabled: @.data().disabled or false
  ]

  events: -> [
    "click": @.destroy
  ]

  destroy: ->
    self = @

    if self.disabled.get()
      return

    Blaze.remove @._internals.templateInstance.view

  renderContent: ->
    if @.data()?.template
      template = Apollos.Component.getComponent(@.data().template)
      template.renderComponent(@.currentComponent())
    else
      null

  insertDOMElement: (parent, node, before) ->

    # fade in background
    $(node).appendTo(parent)
      .velocity "fadeIn",
        duration: 250

    # slide in panel
    $(node).children('.side-panel')
      .velocity
        translateX: [0, -500]
        opacity: 1
      ,
        duration: 250
    super

  removeDOMElement: (parent, node) ->

    # slide out panel
    $(node).children('.side-panel')
      .velocity
        translateX: -500
        opacity: 1
      ,
        duration: 250

    # fade out background
    $(node).velocity "fadeOut",
      duration: 250
      complete: (elements) ->
        $(node).remove()
