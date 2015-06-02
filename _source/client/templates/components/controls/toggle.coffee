
class Apollos.controls.toggle extends Apollos.Component

  @register "Apollos.controls.toggle"


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
