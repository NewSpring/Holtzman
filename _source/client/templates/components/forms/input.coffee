
class Apollos.Forms.Input extends Apollos.Component

  @register "Apollos.Forms.Input"


  vars: -> [

    error: null
    status: null
    value: null
    svgData:
      height: 40
      width: 54

  ]

  events: -> [

    "focus input": @.focused


    "blur input": @.blurred

    # can this be a change event?
    "focus input, keyup input, blur input": @.changed


    "focus input, keyup input": @.active

  ]


  onRendered: ->

    self = @

    if not self.value.get() and self.data()?.preFill
      self.setValue self.data().preFill


    self.autorun ->
      value = self.value.get()

      if self.data()?.bind
        self.data().bind.set value


  focused: (event) ->

    self = @

    # switch to junction when ready
    $(event.target.parentNode)
      .addClass "input--focused input--active"

    parent = self.parent()

    if not parent
      return

    if parent.find("form")
      # account for form being child
      if parent.constructor.name is "Form"
        parent.hasErrors.set false
      else
        parent.children()[0]?.hasErrors?.set false

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

  blurred: (event) ->

    self = @
    parent = self.parent()
    isForm = parent?.find("form")
    data = self.data()

    # switch to junction when ready
    $(event.target.parentNode)
      .removeClass "input--focused"

    if event.target.value

      valid = self.validate event.target.value

      if not valid
        self.error.set true
        self.status.set data.errorText
        if isForm
          # account for form being child
          if parent.constructor.name is "Form"
            parent.hasErrors.set true
          else
            parent.children()[0]?.hasErrors?.set true

      return

    # reset parent errors
    # code for reset parent errors
    if isForm
      # account for form being child
      if parent.constructor.name is "Form"
        parent.hasErrors.set false
      else
        parent.children()[0]?.hasErrors?.set false

    # if the input is empty, remove the input--active class
    if not event.target.value

      # switch to junction when ready
      $(event.target.parentNode)
        .removeClass "input--active"


  changed: (event) ->
    self = @
    # bind the value to the template
    self.value.set event.target.value


  active: (event) ->
    self = @
    # remove the error becuase they are doing something
    self.error.set false
    self.status.set false


  setStatus: (status, isError) ->

    self = @

    if not isError and typeof status is "boolean"
      isError = status

      data = self.data()
      if isError
        status = data.errorText
      else
        status = data.statusText

    self.status.set status
    self.error.set isError


  getValue: ->

    return @.value.get()


  setValue: (value) ->

    value or= ""
    @.value.set value
    @.find("input").value = value
