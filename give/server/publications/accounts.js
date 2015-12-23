
import { api, endpoints } from "../../../rock/lib/api"

const accounts = () => {
  if (api._ && api._.baseURL && REST2DDP) {

    REST2DDP.publish("accounts", {
      collectionName: "accounts",
      restUrl: `${api._.baseURL}api/${endpoints.accounts}`,
      jsonPath: "*",
      pollInterval: 10000,
      headers: {
        [api._.tokenName]: api._.token,
        "Content-Type": "application/json"
      }
    });

    return
  }

}

export default accounts
