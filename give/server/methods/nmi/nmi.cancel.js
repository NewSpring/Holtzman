
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

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
     'Content-Type': 'text/xml'
   },
  })
  .then((response) => {
    return response.text()
  })
  .then((data) => {

    try {
      data = parseXML(data)
    } catch (e) {
      console.log("PARSE ERROR", e, data)
      callback(e)
      return
    }

    if (data["result-code"] === "100") {
      callback(null, data)
      return
    }

    callback(data["result-text"])

  })
  .catch(callback)


}

export default cancelTransaction
