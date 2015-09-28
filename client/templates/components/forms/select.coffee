class Apollos.Forms.Select extends Apollos.Component
  @register "Apollos.Forms.Select"

  vars: -> [

    error: null
    status: null
    value: null
    inactive: @.data()?.inactive or false

  ]

  events: -> [
    "change select": @.changed
  ]

  onRendered: ->

    self = @

    if not self.value.get() and self.data()?.preFill
      self.value.set self.data().preFill

    self.autorun ->
      value = self.value.get()

      if self.data()?.bind
        self.data().bind.set value

    # if Apollos.isMobile()
    return

    select2 = $("select:not([data-is-select2])")

    if not select2.length
      return

    select2.attr("data-is-select2", true).select2()

    select2.on "select2:open", (event) ->
      event.stopPropagation()
      fieldContainer = $ ".select2"
      optionsContainer = $ ".select2-container--open:not(.select2)"
      selectedOption = $ "[aria-selected=true].select2-results__option"

      # Make the select options the width of the field
      optionsContainer.outerWidth(fieldContainer.outerWidth())

      # Make the selected option at the same horizontal as the field
      # TODO: Make this work with the mouseup mousedown problem
      if true # not selectedOption.length
        return

      fieldOffsetTop = fieldContainer.offset().top
      selectedOffsetTop = selectedOption.offset().top
      optionsOffsetTop = optionsContainer.offset().top
      delta = fieldOffsetTop - selectedOffsetTop - 7
      newTop = optionsOffsetTop + delta
      optionsContainer.offset top: newTop

  changed: (event) ->

    self = @

    # bind the value to the template
    self.value.set event.target.value

    # remove the error because they are doing something
    self.error.set false
    self.status.set false

    self.makeActive()

    parent = self.parent()
    if parent.find("form")
      # account for from being child
      parent.children()[0].hasErrors?.set false

    self.error.set false
    self.status.set false

  makeActive: ->
    self = @

    unless self.inactive.get()
      select = self.find("select")
      $(select.parentNode)
        .addClass "input--active"

  setStatus: (status, isError) ->
    self = @

    if not isError and typeof status is "boolean"
      isError = status

      if isError
        status = self.data().errorText
      else
        status = self.data().statusText

      self.status.set status
      self.error.set isError

  getValue: ->
    return @.value.get()

  setValue: (value) ->
    self = @
    self.value.set value

    if value
      self.find("select").value = value
      self.makeActive()
      return

  selected: (val) ->
    return val is @.data().preFill

  validate: (value) ->

    self = @
    data = self.data()
    validateFunction = data.validate

    valid = true
    if typeof validateFunction is "function"
      valid = validateFunction value
    else if validateFunction
      valid = Apollos.validate[validateFunction] value


    return valid
