Router.route "/",
  name: "home"
  template: "home"
  waitOn: ->
    [
      Meteor.subscribe("userData")
      Meteor.subscribe("people")
      Meteor.subscribe("definedValues")
    ]

Router.route "/forgot-password",
  name: "forgotPassword"
  template: "forgotPassword"
