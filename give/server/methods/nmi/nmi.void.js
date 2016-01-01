
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const voidTransaction = (transactionId, callback) => {

  const voidTransactionObj = {
    "void": {
      "api-key": Meteor.settings.nmi,
      "transaction-id": transactionId
    }
  }

  const builder = new Builder()
  const xml = builder.buildObject(voidTransactionObj)

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

export default voidTransaction
