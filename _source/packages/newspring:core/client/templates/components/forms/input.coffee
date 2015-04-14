
class Input

  constructor: (name, template) ->
    @.template = template
    @.name = name

  validate: (validateFunction) ->
    console.log validateFunction

  setStatus: (status, isError) =>

    if not isError and typeof status is "boolean"
      isError = status

      if isError
        status = @.template.data.errorText
      else
        status = @.template.data.statusText


    @.template.status.set status
    @.template.error.set isError



Template.input.onCreated ->

  # reassign this for ease of use
  self = @

  self._ = new Input self.data.name, self

  if self.data.bind
    parentLink = self.data.bind.get()
    parentLink.methods = self._
    self.data.bind.set parentLink

  # Needed states for rendering
  self.error = new ReactiveVar()
  self.status = new ReactiveVar()
  self.value = new ReactiveVar()



Template.input.helpers

  "error": ->
    return Template.instance().error.get()

  "status": ->
    return Template.instance().status.get()

  "value": ->
    return Template.instance().value.get()



Template.input.events


  "focus input": (event, template) ->

    # switch to junction when ready
    $(event.target.parentNode)
      .addClass "input--active"


  "blur input": (event, template) ->

    if event.target.value and template.data.validate
      validateFunction = template.data.validate
      valid = Apollos.validate[validateFunction] event.target.value

      if not valid
        template.error.set true
        template.status.set template.data.errorText


    # reset parent errors
    # code for reset parent errors

    # if the input is empty, remove the input--active class
    if not event.target.value

      # switch to junction when ready
      $(event.target.parentNode)
        .removeClass "input--active"



  # can this be a change event?
  "focus input, keyup input, blur input": (event, template) ->

    # bind the value to the template
    template.value.set event.target.value


  "focus input, keyup input": (event, template) ->

    # remove the error becuase they are doing something
    template.error.set false
    template.status.set false
