/*global Meteor, check */
import StripTags from "striptags"
import { api } from "../../../util/rock"
import { makeNewGuid } from "../../../util"
import Moment from "moment"

let NEW_USER_EMAL_ID = false;
Meteor.methods({

  "rock/accounts/signup": (account) => {
    check(account.email, String)
    check(account.firstName, String)
    check(account.lastName, String)
    check(account.password, String)

    // special case for AD lookup
    if (account.email.indexOf("@newspring.cc") > -1) {
      return Meteor.call("rock/accounts/login", account.email, account.password)
    }


    let existing = api.get.sync(`UserLogins?$filter=UserName eq '${account.email}'`)
    if (!existing.statusText && existing[0] && existing[0].Id) {
      return Meteor.call("rock/accounts/login", account.email, account.password)
    }


    // return variable
    let success = false


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
    let Person = {
      Email: account.email,
      Guid: makeNewGuid(),
      FirstName: StripTags(account.firstName),
      LastName: StripTags(account.lastName),
      IsSystem: false,
      Gender: 0,
      ConnectionStatusValueId: 67, // Web Prospect
      SystemNote: `Created from NewSpring Apollos on ${__meteor_runtime_config__.ROOT_URL}`
    }


    let PersonId = api.post.sync(`People`, Person)
    // create user
    const user = {
      PersonId,
      EntityTypeId: 27,
      UserName: account.email,
      IsConfirmed: true,
      PlainTextPassword: account.password,
      LastLoginDateTime: `${Moment().toISOString()}`
    }

    let createdUser = api.post.sync("UserLogins", user)

    Person = api.get.sync(`People/${PersonId}`)

    const { PrimaryAliasId } = Person
    Meteor.users.update(meteorUserId, {
      $set: {
        "services.rock" : {
          PersonId,
          PrimaryAliasId
        }
      }
    })

    Meteor.setTimeout(() => {
      if (!NEW_USER_EMAL_ID) {
        NEW_USER_EMAL_ID = api.get.sync(`SystemEmails?$filter=Title eq 'Account Created'`)
        NEW_USER_EMAL_ID = NEW_USER_EMAL_ID[0].Id
      }

      let UserLogin = api.get.sync(`UserLogins/${createdUser}`)
      // @TODO setup methods for deleting account and confirming - ConfirmAccountUrl

      Meteor.call(
        "communication/email/send",
        NEW_USER_EMAL_ID,
        Number(Person.PrimaryAliasId),
        {
          Person,
          User: UserLogin,

        }
        , (err, response) => {}
      )

      if (process.env.NODE_ENV === "production") {
        let currentCount = Meteor.users.find().count()
        let missing = `${50000 - currentCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        let text = `Another user signed up for a NewSpring Account! Only ${missing} to go!`


        Meteor.call("communication/slack/send", text, "#users")
      }
    }, 100)

    return success

  },
})
