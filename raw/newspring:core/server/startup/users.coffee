
Meteor.startup ->
  debug "Attempting to sync data from Rock"
  Rock.users.refresh true
  Rock.people.refresh true
