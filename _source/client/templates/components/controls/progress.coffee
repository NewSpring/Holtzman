
class Apollos.Controls.Progress extends Apollos.Component
  @register "Apollos.Controls.Progress"

  steps: ->
    self = @

    steps = self.data().total?.get()

    if typeof steps isnt "number"
      return

    steps = [1..steps].map (value) ->
      return {
        count: value
        active: self.data().active
      }

    return steps

  changeStep: (event) ->

    self = @

    step = event.currentTarget.dataset.step

    self.data().active.set Number(step)

  getLayer: (count) ->

    self = @

    steps = self.data().total?.get()

    return Number(steps) + 2 - Number(count)
