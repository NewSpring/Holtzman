Apollos.checkF1Credentials = (username, password, callback) ->
  Meteor.call "Apollos.checkF1Credentials", username, password, callback
