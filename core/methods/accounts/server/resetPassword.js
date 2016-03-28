/*global Meteor, check */
import { api } from "../../../util/rock"

let RESET_EMAIL_ID = false;
if (typeof Accounts != "undefined") {
  Accounts.emailTemplates.resetPassword.text = (user, token) => {

    // let PersonAliasId, mergeFields
    let { PersonAliasId, PersonId } = user.services.rock
    let { ROOT_URL } = __meteor_runtime_config__

    let Person = api.get.sync(`People/${PersonId}`)

    if (!RESET_EMAIL_ID) {
      RESET_EMAIL_ID = api.get.sync(`SystemEmails?$filter=Title eq 'Reset Password'`)
      RESET_EMAIL_ID = RESET_EMAIL_ID[0].Id
    }

    token = token.split("/")
    token = token[token.length - 1]
    Meteor.call(
      "communication/email/send",
      RESET_EMAIL_ID,
      Number(Person.PrimaryAliasId),
      {
        ResetPasswordUrl: `${ROOT_URL}/_/reset-password/${token}`,
        Person
      }
      , (err, response) => {}
    )

    return false

  }
}

Meteor.methods({
  "rock/accounts/reset": function (current, newPassword) {
    // check(current, String)
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
    if (current) {
      try {
        isAuthorized = api.post.sync(`Auth/login`, { Username, Password: current })
      } catch (e) {
        isAuthorized = false
      }

      if (!isAuthorized) {
        throw new Meteor.Error("Existing password is incorrect")
      }
    }

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`)
    RockUser = RockUser[0]
    RockUser.PlainTextPassword = newPassword
    RockUser.IsConfirmed = true
    try {
      let response = api.put.sync(`UserLogins/${RockUser.Id}`, RockUser)
      if (response.statusText) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      throw new Meteor.Error(e.message)
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false })

    return true

  },
})
