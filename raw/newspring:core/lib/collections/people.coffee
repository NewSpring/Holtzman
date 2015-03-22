Apollos.people = new Mongo.Collection "people"

# TODO: Make this secure
Apollos.people.allow
  insert: (userId, doc) ->
    return true
  update: (userId, doc) ->
    return true
  remove: (userId, doc) ->
    return false # No one gets removed

person = new SimpleSchema
  updatedBy:
    type: String
    optional: true
  personId:
    type: Number
    decimal: false
    optional: true
  givingGroupId:
    type: Number
    decimal: false
    optional: true
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  photoURL:
    type: String
    optional: true
  photoId:
    type: Number
    optional: true
    decimal: false
  maritalStatusValueId:
    type: Number
    optional: true
    decimal: false
  firstName:
    type: String
    optional: true
  nickName:
    type: String
    optional: true
  suffixValueId:
    type: Number
    optional: true
    decimal: false
  titleValueId:
    type: Number
    optional: true
    decimal: false
  lastName:
    type: String
    optional: true
  middleName:
    type: String
    optional: true
  gender:
    type: Number
    decimal: false
    optional: true
  preferredEmail:
    type: String
    optional: true
    regEx: Apollos.regex.email
  emailPreference:
    type: Number
    optional: true
    decimal: false
  homePhone:
    type: String
    optional: true
    regEx: Apollos.regex.phoneNumber
  workPhone:
    type: String
    optional: true
    regEx: Apollos.regex.phoneNumber
  cellPhone:
    type: String
    optional: true
    regEx: Apollos.regex.phoneNumber
  birthDay:
    type: Number
    decimal: false
    min: 1
    max: 31
    optional: true
  birthMonth:
    type: Number
    decimal: false
    min: 1
    max: 12
    optional: true
  birthYear:
    type: Number
    decimal: false
    min: 1900
    max: 2050
    optional: true
  weddingDay:
    type: Number
    decimal: false
    min: 1
    max: 31
    optional: true
  weddingMonth:
    type: Number
    decimal: false
    min: 1
    max: 12
    optional: true
  weddingYear:
    type: Number
    decimal: false
    min: 1900
    max: 2050
    optional: true
  personAliasIds:
    type: [Number]
  recordStatusValueId:
    type: Number
    decimal: false
    optional: true
  communicationPreference:
    type: Number
    optional: true

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

Apollos.people.attachSchema person
