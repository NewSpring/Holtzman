@.People = new Mongo.Collection("people");

###

  @property [Person] All the fields for a person
  Mapped to Rock:Person

###
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
    type: Number
    max: 10
    optional: true
  cellPhone:
    type: Number
    max: 10
    optional: true
  campusId:
    type: Number
  familyGroupId:
    type: Number
  groupRole:
    type: String
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


@.People.attachSchema person
