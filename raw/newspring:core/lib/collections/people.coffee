Apollos.people = new Mongo.Collection "people"
phoneRegex = /^[1-9]([0-9]{6}|[0-9]{9})$/

person = new SimpleSchema(
  personId:
    type: Number
    optional: true
  firstName:
    type: String
    optional: true
  nickName:
    type: String
    optional: true
  lastName:
    type: String
    optional: true
  email:
    type: String
    optional: true
  homePhone:
    type: String
    optional: true
    regEx: phoneRegex
  cellPhone:
    type: String
    optional: true
    regEx: phoneRegex
  campusId:
    type: Number
  familyGroupId:
    type: Number
  groupRole:
    type: String
    regEx: /^(Adult|Child)$/
  personAliasIds:
    type: [Number]
  locationIds:
    type: [Number]
  createdDate:
    type: Date
    autoValue: ->
      if @.isInsert
        return new Date
      else if @.isUpsert
        return $setOnInsert: new Date
      else
        @.unset()
  updatedDate:
    type: Date
    autoValue: ->
      return new Date
)

Apollos.people.attachSchema person
