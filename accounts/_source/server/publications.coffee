
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

  # case insentative
  guid = new RegExp(user.personGuid, "i")

  return Apollos.people.find({ guid: guid })
