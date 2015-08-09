Apollos.people = Apollos.generateCollection "people"

person = Apollos._generateSchema
  userId:
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
    # regEx: Apollos.regex.phoneNumber
  workPhone:
    type: String
    optional: true
    # regEx: Apollos.regex.phoneNumber
  cellPhone:
    type: String
    optional: true
    # regEx: Apollos.regex.phoneNumber
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
    # min: 1900
    # max: 2050
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
    optional: true
  recordStatusValueId:
    type: Number
    decimal: false
    optional: true
  communicationPreference:
    type: Number
    optional: true
  locations:
    type: [Object]
    optional: true
  "locations.$":
    blackbox: true
    optional: true
  campusId:
    type: Number
    optional: true

Apollos.people.attachSchema person

if Meteor.isServer
  Apollos.api.addEndpoint "people", "person"
