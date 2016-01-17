/*global Meteor, check */
import { api } from "../../../util/rock"

Meteor.methods({
  "rock/auth/available": (email) => {
    check(email, String)

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "")
    }

    let isAvailable = api.get.sync(`userlogins/available/${email}`)

    return isAvailable
  }
})
