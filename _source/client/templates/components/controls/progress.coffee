
class Apollos.Controls.Progress extends Apollos.Component
  @register "Apollos.Controls.Progress"

  steps: ->
    self = @

    steps = self.currentData().total?.get()

    console.log steps
    if typeof steps isnt "number"
      return

    steps = [1..steps].map (value) ->
      return {
        count: value
        active: self.currentData().active
      }

    return steps

  events: -> [
    "click [data-step]" : @.changeStep
  ]

  changeStep: (event) ->

    self = @

    step = event.currentTarget.dataset.step

    self.currentData().active.set Number(step)
