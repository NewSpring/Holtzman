Meteor.publish "people", ->
  
  Apollos.people.find
    recordStatusValueId: 3


Meteor.publish "userData", ->

  if @.userId
    return Meteor.users.find
      _id: this.userId
    ,
      fields:
        "rock.personId": 1

  else
    @.ready()
