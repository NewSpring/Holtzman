
class Apollos.Forms.DateInput extends Apollos.Forms.Input

  @register "Apollos.Forms.DateInput"

  template: -> "Apollos.Forms.Input"

  onRendered: ->

    self = @

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

    $(document).on("click", (event) ->

      target = event.target
      targetComponent = Apollos.Component.getComponentForElement(target)

      if targetComponent?.componentName() is self.componentName()
        return

      self.destroyCalendar()

    )

    $(newInput).on("click [data-input]", (event) ->
      self.renderCalendar()
    )

    super


  calendarInstance: null


  renderCalendar: ->
    self = @

    if not self.calendarInstance

      existingCalendar = $('section.calendar')[0]

      if existingCalendar
        calendarComponent = Apollos.Component.getComponentForElement(existingCalendar)
        calendarComponent.dismiss()

      input = self.find("input")
      input.readonly = true

      template = Apollos.Component.getComponent("Apollos.Controls.Calendar")
      template = template.renderComponent()

      template = Blaze.renderWithData(
        template
        {parent: self, frequency: "Biweekly"}
        input.parentNode
      )

      self.calendarInstance = template


  destroyCalendar: (event) ->

    self = @
    view = self.calendarInstance
    self.find("input").readonly = false
    if view
      calendarComponent = Apollos.Component.getComponentForElement($('section.calendar')[0])
      calendarComponent.dismiss()

  onDestroyed: ->
    $(document).unbind("click")

  focused: (event) ->
    event.preventDefault()
    event.stopPropagation()
    @.renderCalendar()

    super(event)
