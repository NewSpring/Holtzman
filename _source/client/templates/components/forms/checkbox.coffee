

class Apollos.Forms.Checkbox extends Apollos.Component

  @register "Apollos.Forms.Checkbox"


  vars: -> [

    error: ""
    status: ""
    value: ""

  ]

  events: -> [
    "click input": @.clicked
  ]

  clicked: (event) ->

    self = @

    # bind the value to the template
    self.value.set event.target.value

    # remove the error becuase they are doing something
    self.error.set false
    self.status.set false


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
