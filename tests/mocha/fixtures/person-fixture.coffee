if not (Meteor.isServer and process.env.IS_MIRROR)
  return

addPersonWithKeys = ->

  Apollos.user.create "apollos.person.keys@newspring.cc", "testPassword"
  user = Apollos.users.findOne "emails.address": "apollos.person.keys@newspring.cc"
  Apollos.users.update
    _id: user._id
  ,
    $set:
      "rock.personId": 12345
      "rock.userLoginId": 23456
      "services.password.reset.token": "meowmeow"
      "services.password.reset.email": "apollos.person.keys@newspring.cc"
      "services.password.reset.when": new Date

  Apollos.user.create "apollos.person.keys.test@newspring.cc", "testPassword"
  user = Apollos.users.findOne "emails.address": "apollos.person.keys.test@newspring.cc"
  Apollos.users.update
    _id: user._id
  ,
    $set:
      "rock.personId": 12349
      "rock.userLoginId": 12349

  person =
    updatedBy: "Apollos"
    personId: 12345
    givingGroupId: 1
    guid: "12345678-1234-1234-1234-123456789012"
    photoURL: "http://newspring.cc"
    photoId: 1
    maritalStatusValueId: 1
    firstName: "Jim"
    suffixValueId: 1
    titleValueId: 1
    lastName: "Bo"
    middleName: "Tiberius"
    gender: 1
    preferredEmail: "jim@tiberius.bo"
    emailPreference: 1
    homePhone: "1123456789"
    workPhone: "1123456789"
    cellPhone: "1123456789"
    birthDay: 1
    birthMonth: 1
    birthYear: 2000
    weddingDay: 1
    weddingMonth: 1
    weddingYear: 2000
    aliases: [1,2]
    recordStatusValueId: 3
    communicationPreference: 1

  person2 =
    updatedBy: "Apollos"
    personId: 12349
    givingGroupId: 1
    guid: "12345678-1234-1234-1234-123456789123"
    photoURL: "http://newspring.cc"
    photoId: 1
    maritalStatusValueId: 1
    firstName: "Slim"
    suffixValueId: 1
    titleValueId: 1
    lastName: "Ro"
    middleName: "Titus"
    gender: 1
    preferredEmail: "slim@titus.ro"
    emailPreference: 1
    homePhone: "1123456789"
    workPhone: "1123456789"
    cellPhone: "1123456789"
    birthDay: 1
    birthMonth: 1
    birthYear: 2000
    weddingDay: 1
    weddingMonth: 1
    weddingYear: 2000
    aliases: [1,2]
    recordStatusValueId: 3
    communicationPreference: 1

  Apollos.people.insert person
  Apollos.people.insert person2


addPersonWithoutKeys = ->

  Apollos.user.create "apollos.person.nokeys@newspring.cc", "testPassword"


addPersonWithKeys()
addPersonWithoutKeys()
