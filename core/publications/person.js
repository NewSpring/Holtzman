/*global REST2DDP, Meteor */

import { api } from "../../lib/api"

const people = () => {
  if (api._ && api._.baseURL && REST2DDP) {


    const getPerson = function (callback) {

      const user = Meteor.users.findOne(this.userId)

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, [])
        return
      }

      const { rock } = user.services

      const query =  api.parseEndpoint(`
        People/${rock.PersonId}
      `)

      api.get(query, (err, person) => {
        if (err) { callback(err); return }

        const locations = api.parseEndpoint(`
          Groups/GetFamilies/${rock.PersonId}?
            $expand=
              GroupLocations,
              GroupLocations/Location,
              GroupLocations/GroupLocationTypeValue,
              Campus
            &$select=
              Campus/Name,
              Campus/ShortCode,
              Campus/Id,
              GroupLocations/Location/Street1,
              GroupLocations/Location/Street2,
              GroupLocations/Location/City,
              GroupLocations/Location/State,
              GroupLocations/Location/Country,
              GroupLocations/Location/PostalCode,
              GroupLocations/Location/Id,
              GroupLocations/GroupLocationTypeValue/Value
        `)

        api.get(locations, (err, personLocations) => {

          if (err) { callback(err); return }

          const personLocation = personLocations[0]
          const groups = personLocation.GroupLocations.filter((x) => {
            return x.GroupLocationTypeValue.Value === "Home"
          })

          let home = groups[0]
          home || (home = {})
          home = home.Location
          person.Home = home
          person.Campus = personLocation.Campus

          const keysToKeep = [
            "Age",
            "BirthDay",
            "BirthMonth",
            "BirthYear",
            "Campus",
            "Email",
            "FirstName",
            "Home",
            "LastName",
            "NickName",
            "PhoneNumbers",
            "PhotoUrl"
          ]

          for (let key in person) {
            if (keysToKeep.indexOf(key) === -1) {
              delete person[key]
            }
          }

          callback(null, [ person ])

        })

      })
    }


    return REST2DDP.publish("people", {
      collectionName: "people",
      method: getPerson,
      jsonPath: "*",
      pollInterval: 10000
    })

  }

}

export default people
