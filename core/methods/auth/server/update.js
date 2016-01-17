/*global Meteor, check */
import { api } from "../../../util/rock"

Meteor.methods({
  "rock/auth/update": function (data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information")
    }

    const user = Meteor.users.findOne(this.userId)

    const Person = { ...data }

    // move campus to another call
    const Campus = Person.Campus
    delete Person.Campus

    let result
    try {
      result = api.patch.sync(`People/${user.services.rock.PersonId}`, Person)
      let group = api.get.sync(`Groups/GetFamilies/${user.services.rock.PersonId}?$select=Id`)
      result = api.patch.sync(`Groups/${group[0].Id}`, { CampusId: Campus })
    } catch (e) {
      throw new Meteor.Error(e)
    }

    if (result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile")
    }

    return true

  },
})
