
class Apollos.Controls.Toggle extends Apollos.Component

  @register "Apollos.Controls.Toggle"


  events: -> [
    "click [data-toggle]": @.toggle
  ]


  toggle: (event) ->

    self = @
    parent = self.parent()
    currentData = parent.currentData()

    if event.target.dataset?.toggle is "item1"
      currentData.active.set true
    else
      currentData.active.set false
