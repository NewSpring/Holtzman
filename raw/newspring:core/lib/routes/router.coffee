Router.route "/",
  name: "home"
  template: "home"
  waitOn: ->
    [
      Meteor.subscribe("userData")
      Meteor.subscribe("people")
      Meteor.subscribe("definedValues")
    ]
