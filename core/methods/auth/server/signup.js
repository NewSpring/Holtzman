/*global Meteor, check */
import { api } from "../../../util/rock"
import { makeNewGuid } from "../../../util"

Meteor.methods({

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
      Guid: makeNewGuid(),
      FirstName: account.firstName,
      LastName: account.lastName,
      IsSystem: false,
      Gender: 0,
      SystemNote: "Created from NewSpring Apollos"
    }


    api.post(`People`, Person, (err, PersonId) => {
      // create user
      const user = {
        PersonId,
        EntityTypeId: 27,
        UserName: account.email,
        PlainTextPassword: account.password
      }

      api.post("UserLogins", user, () => {
        api.get(`People/${PersonId}`, (err, createdPerson) => {
          const { PrimaryAliasId } = createdPerson
          Meteor.users.update(meteorUserId, {
            $set: {
              "services.rock" : {
                PersonId,
                PrimaryAliasId
              }
            }
          }, () => {

          })
        })
      })

    })

    return success

  },
})
