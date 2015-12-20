
import { api } from "../../../lib/api"
import Apollos from "../../../../core/lib"

function makeGUID () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }


  const guid = `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  return guid.toUpperCase()
}

Meteor.methods({
  "Rock.auth.available": (email) => {
    if (!email) {
      return false
    }
    check(email, String)

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "")
    }

    const SyncCall = Meteor.wrapAsync(api.get, api)

    let isAvailable = false
    try {
      isAvailable = SyncCall(`userlogins/available/${email}`)
    } catch (e) {
      console.log("lookup in users account in meteor")
    }

    return isAvailable
  },
  "Rock.auth.login": (Username, password) => {
    check(Username, String)
    check(password, String)

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "")
    }

    const SyncCall = Meteor.wrapAsync(api.post, api)
    let isAuthorized = false

    try {
      SyncCall(`Auth/login`, { Username, Password: password })
      isAuthorized = true
    } catch (e) {
      isAuthorized = false
    }


    return isAuthorized
  },
  "Rock.auth.signup": (Username, password) => {
    check(Username, String)
    check(password, String)

    console.log("Creating a new signup")

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "")

      return false
    }

    let success = false
    const SyncPost = Meteor.wrapAsync(api.post, api)
    const SyncGet = Meteor.wrapAsync(api.get, api)

    // Create person
    const Person = {
      Email: Username
    }

    let Guid = makeGUID();
    Person.IsSystem = false;
    Person.Gender = 0
    Person.SystemNote = "Created from NewSpring Apollos"
    Person.Guid = Guid;

    try {
      const PersonId = SyncPost(`People`, Person)
      console.log("NEW PERSON", PersonId)
      // create user
      const user = {
        PersonId,
        EntityTypeId: 27,
        UserName: Username,
        PlainTextPassword: password
      }
      const userId = SyncPost("UserLogins", user)
      console.log("NEW USER", userId)
      if (userId) {
        success = true
      }
    } catch (e) {
      success = false
    }

    return success

  }
})

// 305454
// {
//     "Email": "jbaxley@me.com",
//     "IsSystem": false,
//     "Gender": 0,
//     "SystemNote": "Create from NewSpring Apollos",
//     "Guid": "4CF25121-F759-B48F-F37E-45D0225D452B"
// }

// 90818 james.baxley PersonId
// "37add244-710a-4548-aeaf-2ff0e47207ef" // james.baxley GUID
