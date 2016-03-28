/*global Meteor, check */
import Moment from "moment"

import { api, parseEndpoint } from "../../../util/rock"
import Validate from "../../../util/validate"

let RECOVER_ACCOUNT = false;
if (typeof Accounts != "undefined") {
  Accounts.emailTemplates.enrollAccount.text = (user, token) => {

    // let PersonAliasId, mergeFields
    let { PersonId } = user.profile.rock
    let { ROOT_URL } = __meteor_runtime_config__

    let Person = api.get.sync(`People/${PersonId}`)

    if (!RECOVER_ACCOUNT ) {
      RECOVER_ACCOUNT = api.get.sync(`SystemEmails?$filter=Title eq 'Recover Account'`)
      RECOVER_ACCOUNT = RECOVER_ACCOUNT.length ? RECOVER_ACCOUNT[0].Id : false
    }

    token = token.split("/")
    token = token[token.length - 1]
    if (RECOVER_ACCOUNT) {
      Meteor.call(
        "communication/email/send",
        RECOVER_ACCOUNT,
        Number(Person.PrimaryAliasId),
        {
          ResetPasswordUrl: `${ROOT_URL}/_/reset-password/${token}`,
          Person,
        }
        , (err, response) => {}
      )
    }


    return false

  }
}

Meteor.methods({
  "rock/accounts/recover": (email, PersonId) => {

    check(email, String);
    check(PersonId, Number);

    let meteorUserId;

    // Create Apollos Account
    // try to create new meteor account
    try {
      let user = Accounts.findUserByEmail(email)
      if (user && user._id) {
        meteorUserId = user._id
      } else {
        meteorUserId = Accounts.createUser({
          email: email,
          profile: {
            rock: {
              PersonId,
            },
          },
        })
      }

    } catch (e) {
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account")
    }

    // Create Rock Account
    const user = {
      PersonId,
      EntityTypeId: 27,
      UserName: email,
      IsConfirmed: false,
      // PlainTextPassword: account.password,
      LastLoginDateTime: `${Moment().toISOString()}`
    }

    let createdUser = api.post.sync("UserLogins", user)
    if (createdUser.statusText) {
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account")
    }

    try {
      let person = api.get.sync(`People/${PersonId}`)
      const { PrimaryAliasId } = person

      Meteor.users.update(meteorUserId, {
        $set: {
          "services.rock" : {
            PersonId,
            PrimaryAliasId
          }
        }
      })

      // Send Reset Email
      Accounts.sendEnrollmentEmail(meteorUserId)

      // let the client know
      return true
    } catch (e) {
      console.error(e, "recover line 108")
      throw new Meteor.Error("There was a problem finishing your account, please try again or create a new account")
    }


  }
})
