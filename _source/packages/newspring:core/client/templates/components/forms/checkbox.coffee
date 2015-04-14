
class Checkbox

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




Template.checkbox.onCreated ->

  # reassign this for ease of use
  self = @

  self._ = new Checkbox self.data.name, self

  if self.data.bind
    parentLink = self.data.bind.get()
    parentLink.methods = self._
    self.data.bind.set parentLink

  # Needed states for rendering
  self.error = new ReactiveVar()
  self.status = new ReactiveVar()
  self.value = new ReactiveVar()



Template.checkbox.helpers

  "error": ->
    return Template.instance().error.get()

  "status": ->
    return Template.instance().status.get()

  "value": ->
    return Template.instance().value.get()



Template.checkbox.events


  "click input": (event, template) ->

    # bind the value to the template
    template.value.set event.target.value

    # remove the error becuase they are doing something
    template.error.set false
    template.status.set false
