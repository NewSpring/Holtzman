
class Apollos.Forms.NumberInput extends Apollos.Forms.Input

  @register "Apollos.Forms.NumberInput"

  template: -> "Apollos.Forms.Input"

  vars: -> super.concat [
    keyboardAmount: null
    keyboardClicked: false
  ]

  onRendered: ->

    self = @

    if Apollos.isMobile()

      ###

        We need to cover up the input here so phones wont
        bring up the keyboard up

      ###
      input = self.find("input")
      newInput = document.createElement("SPAN")
      newInput.setAttribute "data-input", true

      newInput.style.position = "absolute"
      newInput.style.top = "0"
      newInput.style.bottom = "0"
      newInput.style.left = "0"
      newInput.style.right = "0"

      input.parentNode.appendChild newInput

      $(newInput).on("click [data-input]", (event) ->
        self.renderKeyboard()
      )

      Tracker.autorun ->
        currentAmount = self.keyboardAmount.get()

        self.setValue currentAmount


      $(document).on("click", (event) ->

        target = event.target
        targetComponent = Apollos.Component.getComponentForElement(target)

        if targetComponent?.componentName() is self.componentName()
          return

        self.destroyKeyboard()

      )

    super


  keyboardInstance: null


  renderKeyboard: ->
    self = @

    if Apollos.isMobile() and not self.keyboardInstance
      self.find("input").readonly = true

      template = Apollos.Component.getComponent("Apollos.Controls.NumberKeyboard")
      template = template.renderComponent()

      template = Blaze.renderWithData(
        template
        {amount: self.keyboardAmount, parent: self}
        document.body
      )

      self.keyboardInstance = template


  destroyKeyboard: (event) ->

    self = @
    view = self.keyboardInstance
    self.find("input").readonly = false
    if view
      Blaze.remove view


  onDestroyed: ->
    $(document).unbind("click")


  focused: (event) ->

    if Apollos.isMobile()
      event.preventDefault()
      event.stopPropagation()
      @.renderKeyboard()

    super(event)
