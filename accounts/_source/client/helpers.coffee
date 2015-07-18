
Apollos.helpers._addHelper "currentPerson", Apollos.person

Apollos.user.hasAccount = (email, callback) ->
  Meteor.call "Apollos.user.hasAccount", email, callback
