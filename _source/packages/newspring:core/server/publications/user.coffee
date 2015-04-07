
Meteor.publish "apollos-users", ->

  return Apollos.users.find({},
    fields:
      emails: 1
  )
