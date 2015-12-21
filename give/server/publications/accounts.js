
import { api } from "../../../rock/lib/api"

if (api._ && api._.baseURL && REST2DDP) {

  let query =  `
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
  `.split("\n").map((x) => { return x.trim()}).join("")

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
}
