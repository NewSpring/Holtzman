class Apollos.modal extends Apollos.Component

  @register "Apollos.modal"

  events: -> [
    "click": @.destroy
  ]

  destroy: ->
    Blaze.remove @._internals.templateInstance.view

  renderContent: ->
    if @.data()?.template
      template = Apollos.Component.getComponent(@.data().template)
      template.renderComponent(@.currentComponent())
    else
      null

  insertDOMElement: (parent, node, before) ->
    startingPoint = $(window).height() / 2

    # fade in background
    $(node)
      .appendTo(parent)
      .velocity "fadeIn",
        duration: 500

    # slide down from top
    $(node).find('section').first()
      .velocity
        translateY: [0, -startingPoint]
        translateZ: 0
      ,
        display: "block"
        delay: 500
        duration: 250
    super

  removeDOMElement: (parent, node) ->
    endingPoint = $(window).height()

    # slide out to bottom
    $(node).find('section').first()
      .velocity
        translateY: -endingPoint
        translateZ: 0
      ,
        duration: 250

    # fade out background
    $(node).velocity "fadeOut",
      delay: 250
      duration: 250
      complete: (elements) ->
        $(node).remove()
