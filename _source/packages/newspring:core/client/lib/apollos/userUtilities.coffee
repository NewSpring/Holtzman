Apollos.checkF1Credentials = (username, password, callback) ->
  Meteor.call "Apollos.checkF1Credentials", username, password, callback


Apollos.hasF1Account = (email, callback) ->
  Meteor.call "Apollos.hasF1Account", email, callback


Apollos.getAccountType = (email, callback) ->
  Meteor.call "Apollos.user.getAccountType", email, callback
