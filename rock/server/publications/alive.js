/*global serverWatch */

import { api } from "../../lib/api"

const alive = () => {
  if (api._ && api._.baseURL && serverWatch) {

    // If Rock is being watched (aka old states), remove watching
    if (serverWatch.getKeys().indexOf("ROCK") != -1) {
      serverWatch.stopWatching("ROCK")
    }

    // Start watching again
    serverWatch.watch("ROCK", api._.baseURL, 30 * 1000)

  }

}

export default alive
