
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
    check(email, String)

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "")
    }

    let isAvailable = false
    try {
      isAvailable = api.get.sync(`userlogins/available/${email}`)
    } catch (e) {
      console.log(e, "DANGER WILL ROBINSON")
      console.log("lookup in users account in meteor")
    }

    return isAvailable
  },
  "Rock.auth.reset": function(current, newPassword){
    check(current, String)
    check(newPassword, String)

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your password")
    }

    let user = Meteor.users.findOne(this.userId)
    let email = user.emails[0].address
    const Username = email // this will need to be adjusted long term

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT")
    }

    let isAuthorized = false
    try {
      isAuthorized = api.post.sync(`Auth/login`, { Username, Password: current })
    } catch (e) {
      isAuthorized = false
    }

    if (!isAuthorized) {
      throw new Meteor.Error("Existing password is incorrect")
    }

    // need to ask core about changing passwords
    // const user = {
    //   EntityTypeId: 27,
    //   UserName: account.email,
    //   PlainTextPassword: account.password
    // }
    //
    // try {
    //   api.patch.sync(`UserLogins`, user)
    // } catch (e) {
    //   throw new Meteor.Error(e)
    // }

    Accounts.setPassword(this.userId, newPassword, { logout: false })


    return true


  },
  "Rock.auth.login": (Username, password) => {
    check(Username, String)
    check(password, String)

    const email = Username

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "")
    }

    let isAuthorized = false
    try {
      isAuthorized = api.post.sync(`Auth/login`, { Username, Password: password })
    } catch (e) {
      isAuthorized = false
    }

    let userAccount = Accounts.findUserByEmail(email)

    // ensure the users exists if they tried to login
    if (isAuthorized && !userAccount) {
      userAccount =  Accounts.createUser({
        email: email,
        password: password
      })
    }


    api.get(`UserLogins?$filter=UserName eq '${Username}'`, (err, user) => {
      const { PersonId } = user[0]

      api.get(`People/${PersonId}`, (err, person) => {
        const { PrimaryAliasId } = person

        if (userAccount) {
          Meteor.users.update(userAccount._id || userAccount, {
            $set: {
              "services.rock" : {
                PersonId,
                PrimaryAliasId
              }
            }
          })
        }
      })

    })


    return isAuthorized
  },
  "Rock.auth.signup": (account) => {
    check(account.email, String)
    check(account.firstName, String)
    check(account.lastName, String)
    check(account.password, String)

    // return variable
    let success = false

    // special case for AD lookup
    if (account.email.indexOf("@newspring.cc") > -1) {
      return false
    }

    // see if they already have a meteor account (they shouldn't)
    let userAccount = Accounts.findUserByEmail(account.email)

    // if they do, kill it with fire
    if (userAccount) {
      Meteor.users.remove(userAccount._id)
    }

    let meteorUserId = null
    // try to create new meteor account
    try {
      meteorUserId = Accounts.createUser({
        email: account.email,
        password: account.password
      })
      success = true
    } catch (e) {
      return false
    }


    /*

      Create person in Rock

      Async

    */

    // Create person
    const Person = {
      Email: account.email,
      Guid: makeGUID(),
      FirstName: account.firstName,
      LastName: account.lastName,
      IsSystem: false,
      Gender: 0,
      SystemNote: "Created from NewSpring Apollos",
    }


    let PersonId = null
    api.post(`People`, Person, (err, PersonId) => {
      // create user
      const user = {
        PersonId,
        EntityTypeId: 27,
        UserName: account.email,
        PlainTextPassword: account.password
      }

      api.post("UserLogins", user, (err, userId) => {
        api.get(`People/${PersonId}`, (err, createdPerson) => {
          const { PrimaryAliasId } = createdPerson
          Meteor.users.update(meteorUserId, {
            $set: {
              "services.rock" : {
                PersonId,
                PrimaryAliasId
              }
            }
          }, (err, id) => {

          })
        })
      })

    })



    return success

  }
})
