/*global REST2DDP */

import { api } from "../util/rock"

const campuses = () => {
  if (api._ && api._.baseURL && typeof REST2DDP != "undefined") {


    const getCampuses = function (callback) {
      let query = api.parseEndpoint(`
        Campuses?
          $select=
            Name,
            ShortCode,
            Id,
            LocationId
      `)

      api.get(query, (err, locations) => {
        if (err) { callback(err); return }

        callback(null, locations)
      })
    }


    return REST2DDP.publish("campuses", {
      collectionName: "campuses",
      method: getCampuses,
      jsonPath: "*",
      pollInterval: 86400000
    })

  }

}

export default campuses
