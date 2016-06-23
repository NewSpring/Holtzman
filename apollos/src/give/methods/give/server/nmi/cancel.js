/*global Meteor */

import { Builder } from "xml2js"
import { parseXML } from "../../../../../core/util"
import ErrorCodes from "./language"

const cancelTransaction = (transactionId, callback) => {

  const cancelTransactionObj = {
    "delete-subscription": {
      "api-key": Meteor.settings.nmi,
      "subscription-id": transactionId
    }
  }

  const builder = new Builder()
  const xml = builder.buildObject(cancelTransactionObj)

  return fetch("https://secure.networkmerchants.com/api/v2/three-step", {
    method: "POST",
    body: `${xml}`,
    headers: {
      "Content-Type": "text/xml"
    }
  })
  .then((response) => {
    return response.text()
  })
  .then((data) => {

    try {
      data = parseXML(data)
    } catch (e) {
      callback(e)
      return
    }

    if (data["result-code"] === "100") {
      callback(null, data)
      return
    }
    let number = Number(data["result-code"])
    let err;
    if (ErrorCodes[number] && ErrorCodes[number] != "result-text") {
      err = ErrorCodes[number]
    } else if (ErrorCodes[number] === "result-text")  {
      err = data["result-text"]
    }

    callback(err)

  })
  .catch(callback)


}

export default cancelTransaction
