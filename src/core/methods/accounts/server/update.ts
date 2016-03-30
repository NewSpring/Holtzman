/*global Meteor, check */
import { api } from "../../../util/rock"

Meteor.methods({
  "rock/accounts/update": function (data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information")
    }

    const user = Meteor.users.findOne(this.userId)

    const Person = { ...data }

    // clean up data
    for (let key in Person) {
      if (!Person[key]) {
        delete Person[key]
      }
    }

    let result;
    try {
      result = api.patch.sync(`People/${user.services.rock.PersonId}`, Person)

    } catch (e) {
      throw new Meteor.Error(e.message)
    }

    if (result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile")
    }

    return true

  },
})
