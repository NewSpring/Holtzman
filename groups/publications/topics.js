/*global REST2DDP */

import { api } from "../../core/util/rock"

const groupTopics = () => {
  if (api._ && api._.baseURL && typeof REST2DDP !="undefined") {


    const getGroupTopics = function (callback) {
      let query = api.parseEndpoint(`
        DefinedValues?
          $filter=
            DefinedTypeId eq 52
          &$select=
            Description,
            Value,
            Id

      `)

      api.get(query, (err, locations) => {
        if (err) { callback(err); return }

        callback(null, locations)
      })
    }


    return REST2DDP.publish("groupTopics", {
      collectionName: "groupTopics",
      method: getGroupTopics,
      jsonPath: "*",
      pollInterval: 86400000
    })

  }

}

export default groupTopics
