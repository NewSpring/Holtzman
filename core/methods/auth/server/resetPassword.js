/*global Meteor, check */
import { api } from "../../../util/rock"

Meteor.methods({
  "rock/auth/reset": function (current, newPassword) {
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

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`)

    RockUser.PlainTextPassword = newPassword

    try {
      api.put.sync(`UserLogins/${RockUser.Id}`, RockUser)
    } catch (e) {
      throw new Meteor.Error(e)
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false })

    return true

  },
})
