Apollos.user.login.f1 = (username, password, callback) ->
  Meteor.call "Apollos.user.login.f1", username, password, callback

Apollos.user.login.ldap = (username, password, callback) ->
  Meteor.call "Apollos.user.login.ldap", username, password, callback

Apollos.user.getAccountType = (email, callback) ->
  Meteor.call "Apollos.user.getAccountType", email, callback
