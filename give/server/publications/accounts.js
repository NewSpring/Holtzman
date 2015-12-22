
import { api } from "../../../rock/lib/api"

const accounts = () => {
  if (api._ && api._.baseURL && REST2DDP) {

    let query =  api.parseEndpoint(`
      FinancialAccounts?
        $select=
          Id,
          IsActive,
          EndDate,
          Name,
          PublicName,
          Description,
          PublicDescription,
          IsPublic,
          Order,
          Url,
          AccountTypeValueId
        &$filter=
          ParentAccountId eq null and
          IsPublic eq true and
          IsActive eq true and
          Description ne null
    `)

    REST2DDP.publish("accounts", {
      collectionName: "accounts",
      restUrl: `${api._.baseURL}api/${query}`,
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
