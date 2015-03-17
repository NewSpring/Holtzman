Template.registerHelper "Rock", Rock

Meteor.call("rock-url", (err, name) ->
  Rock.baseURL = name
)
