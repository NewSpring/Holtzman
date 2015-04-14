Router.route "/",
  name: "home"
  template: "home"
  waitOn: ->
    [
      Meteor.subscribe("userData")
      Meteor.subscribe("people")
      Meteor.subscribe("definedValues")
    ]



Router.route "/reset-password",
  name: "resetPassword"
  template: "resetPassword"
