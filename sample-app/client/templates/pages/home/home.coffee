
class home extends Apollos.Component
  @register "home"

  vars: -> [
    step: 1
    steps: 4
  ]

  events: -> [
    "click #logout": (event) ->
      event.preventDefault()
      Meteor.logout()
      return
  ]
