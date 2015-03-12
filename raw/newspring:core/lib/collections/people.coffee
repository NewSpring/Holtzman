Apollos.people = new Mongo.Collection "people"

person = new SimpleSchema
  personId:
    type: Number
    optional: true
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  photoURL:
    type: String
    optional: true
  maritalStatus:
    type: String
    optional: true
    allowedValues: Rock.constants.maritalStatuses
  firstName:
    type: String
    optional: true
  nickName:
    type: String
    optional: true
  suffix:
    type: String
    optional: true
    allowedValues: Rock.constants.suffixes
  title:
    type: String
    optional: true
    allowedValues: Rock.constants.titles
  lastName:
    type: String
    optional: true
  middleName:
    type: String
    optional: true
  gender:
    type: String
    optional: true
    allowedValues: Rock.constants.genders
  preferredEmail:
    type: String
    optional: true
    regEx: Apollos.regex.email
  emailPreference:
    type: String
    optional: true
    allowedValues: Rock.constants.emailPreferences
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
  status:
    type: String
    allowedValues: Rock.constants.statuses
    optional: true
  communicationPreference:
    type: String
    allowedValues: Rock.constants.communicationPreferences
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
