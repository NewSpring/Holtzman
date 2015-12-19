
import { api } from "../../../lib/api"

if (Meteor) {
  Meteor.methods({
    "Rock.login": (email) => {
      check(email, String)
      // special case for AD lookup
      if (email.indexOf("@newspring.cc") > -1) {
        email = email.replace(/@newspring.cc/, "")
      }

      const SyncCall = Meteor.wrapAsync(api.get, api)
      const isAvailable = SyncCall(`userlogins/available/${email}`)

      return isAvailable
    }
  })
}
