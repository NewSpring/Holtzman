class Apollos.Controls.Calendar extends Apollos.Component
  @register "Apollos.Controls.Calendar"

  events: -> [
    "click": @.stop
  ]

  onCreated: ->

    self = @
    @.parent = @.data().parent

  stop: (event) ->

    event.stopPropagation()
    event.preventDefault()

  dismiss: (event) ->
    @.parent.calendarInstance = null

    Blaze.remove @._internals.templateInstance.view

    @.stop(event) if event

    return

