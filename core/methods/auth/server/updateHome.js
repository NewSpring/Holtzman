/*global Meteor, check */
import { api } from "../../../util/rock"
import { Guid } from "../../../util"

Meteor.methods({
  "rock/auth/updateHome": function (data) {

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information")
    }

    const user = Meteor.users.findOne(this.userId)

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

    let home = false

    for (let location of locations) {
      if (location.GroupLocationTypeValue.Value === "Home") {
        home = location.Location.Id
      }
    }

    // move campus to another call
    const Campus = data.Campus
    delete data.Campus

    if (GroupId) {
      let result = api.patch.sync(`Groups/${GroupId}`, { CampusId: Campus })
    }

    if (home) {
      let success = api.patch.sync(`Locations/${home}`, data)
      if (success) {
        return true
      } else {
        throw new Meteor.Error(success)
      }
    }


    /*

      The user does not have a home so far, we need to create a Location and Group Location

    */

    const Location = { ...{
      Guid: Guid.newGuid(),
      IsActive: true
    }, ...data }

    let LocationId = api.post.sync(`Locations`, Location)

    if (!LocationId) {
      throw new Meteor.Error("Location could not be created", Location)
    }

    const GroupLocation = {
      GroupId,
      LocationId,
      GroupLocationTypeValueId: 19, // Home
      IsMailingLocation: true,
      Guid: Guid.newGuid(),
      CreatedByPersonAliasId: user.services.rock.PrimaryAliasId
    }

    let result = api.post.sync(`GroupLocations`, GroupLocation)

    if (result.state === 400) {
      throw new Meteor.Error(result)
    }

    return true


  },
})
