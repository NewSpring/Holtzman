class Apollos.modal extends Apollos.Component

  @register "Apollos.modal"

  vars: -> [
    desktopDuration: 250
    mobileDuration: 400
  ]

  events: -> [
    "click [data-dismiss]": @.destroy
    "click": @.closeIfOverlay
  ]

  alignTop: ->
    self = @
    self.data().verticalAlign is "top"

  destroy: (event) ->
    self = @

    unless Session.get("Apollos.modal.disabled")
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
    self = @

    width = $(window).width()
    height = $(window).height()

    if width > 767
      # fade in background
      $(node).appendTo(parent)
        .velocity "fadeIn",
          duration: self.desktopDuration.get()

      # slide in panel from left
      $(node).children('.side-panel')
        .velocity
          translateX: [0, -500]
          opacity: 1
        ,
          duration: self.desktopDuration.get()
          complete: (elements) ->
            $('html').addClass 'modal--opened'
      super

    else
      # just add background
      # $(node).appendTo(parent).css(bottom: 0)

      # slide in panel from bottom
      $(node).appendTo(parent).children('.side-panel')
        .css
          transform: "translateY(#{height}px)"
        .velocity
          translateY: [0, height]
          opacity: 1
        ,
          duration: self.mobileDuration.get()
          complete: (elements) ->
            $('html').addClass 'modal--opened'


  removeDOMElement: (parent, node) ->
    self = @

    width = $(window).width()
    height = $(window).height()

    if width > 767
      # slide out panel to the left
      $(node).children('.side-panel')
        .velocity
          translateX: -500
          opacity: 1
        ,
          duration: self.desktopDuration.get()

      # fade out background
      $(node).velocity "fadeOut",
        duration: self.desktopDuration.get()
        complete: (elements) ->
          $(node).remove()
          $('html').removeClass 'modal--opened'

    else
      # slide out panel to the bottom
      $(node).children('.side-panel')
        .velocity
          translateY: height
          opacity: 1
        ,
          duration: self.mobileDuration.get()
          complete: (elements) ->
            $(node).remove()
            $('html').removeClass 'modal--opened'
