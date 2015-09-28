Meteor.publish "definedValues", ->
  Apollos.definedValues.find()
