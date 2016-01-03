
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const schedule = (purchaseData, callback) => {
  // let url = process.env.ROOT_URL ? `process.env.ROOT_URL/give` : "http://localhost:3000/give"
  let url = "https://alpha.newspring.io/give"

  const subscription = {
    "add-subscription": {...{
      "api-key": Meteor.settings.nmi,
      "redirect-url": url,
      "order-description": "Online schedule from Apollos",
      "order-id": `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}` || purchaseData.orderId,
    }, ...purchaseData}
  }

  // if (!purchaseData["customer-vault-id"] && !purchaseData["customer-id"]) {
  //   subscription.subscription["add-customer"] = ""
  // }


  const builder = new Builder()
  const xml = builder.buildObject(subscription)

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

export default schedule
