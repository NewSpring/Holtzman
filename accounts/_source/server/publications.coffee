
Meteor.publish "userData", ->

    return Meteor.users.find({_id: @.userId},
      {
        fields:
          'personGuid': 1
      }
    );


Meteor.publish "person", ->

  user = Apollos.users.findOne @.userId
  if not user?.personGuid
    return

  return Apollos.people.find({guid: user.personGuid})
