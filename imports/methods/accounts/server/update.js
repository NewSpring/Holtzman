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

    if (data.Campus) {
      let query = api.parseEndpoint(`
        Groups/GetFamilies/${user.services.rock.PersonId}?
          $expand=
            GroupLocations,
            GroupLocations/Location,
            GroupLocations/GroupLocationTypeValue
          &$select=
            Id,
            GroupLocations/Location/Id,
            GroupLocations/GroupLocationTypeValue/Value
      `)

      let locations = api.get.sync(query)
      locations = locations[0]
      let GroupId = locations.Id
      locations = locations.GroupLocations

      // move campus to another call
      const Campus = data.Campus
      delete Person.Campus

      if (GroupId) {
        result = api.patch.sync(`Groups/${GroupId}`, { CampusId: Campus })
      }

    }


    result = api.patch.sync(`People/${user.services.rock.PersonId}`, Person)

    if (result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile")
    }

    return true

  },
})
