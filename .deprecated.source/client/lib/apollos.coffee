
Template.registerHelper "Apollos", Apollos

Template.registerHelper "currentPerson", Apollos.person

Apollos.user.hasAccount = (email, callback) ->
  Meteor.call "Apollos.user.hasAccount", email, callback
