class Apollos.modal extends Apollos.Component

  @register "Apollos.modal"

  events: -> [
    "click [data-dismiss]": @.destroy
    "click": @.closeIfOverlay
  ]

  destroy: (event) ->
    event?.preventDefault()
    Blaze.remove @._internals.templateInstance.view

  closeIfOverlay: (event) ->
    if $(event.currentTarget).hasClass("overlay--solid-dark")
      @.destroy(event)

  renderContent: ->
    if @.data()?.template
      template = Apollos.Component.getComponent(@.data().template)
      template.renderComponent(@.currentComponent())
    else
      null

  insertDOMElement: (parent, node, before) ->

    width = $(window).width()
    height = $(window).height()

    if width >= 767
      # fade in background
      $(node).appendTo(parent)
        .velocity "fadeIn",
          duration: 250

      # slide in panel from left
      $(node).children('.side-panel')
        .velocity
          translateX: [0, -500]
          opacity: 1
        ,
          duration: 250
      super

    else
      # just add background
      $(node).appendTo(parent)

      # slide in panel from bottom
      $(node).children('.side-panel')
        .velocity
          translateY: [0, height]
          opacity: 1
        ,
          duration: 250


  removeDOMElement: (parent, node) ->

    width = $(window).width()
    height = $(window).height()

    if width > 767
      # slide out panel to the left
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

    else
      # slide out panel to the bottom
      $(node).children('.side-panel')
        .velocity
          translateY: height
          opacity: 1
        ,
          duration: 250
          complete: (elements) ->
            $(node).remove()
