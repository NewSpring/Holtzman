
Meteor.publish "person", ->
  user = Apollos.users.findOne @.userId

  if not user?.personGuid
    return
  
  return Apollos.people.find({guid: user.personGuid})
