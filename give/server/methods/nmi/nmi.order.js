
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const step2 = (purchaseData, callback) => {
  let url = process.env.ROOT_URL ? `process.env.ROOT_URL/give` : "http://localhost:3000/give"
  const sale = {
    "sale": {...{
      "api-key": Meteor.settings.nmi,
      "redirect-url": url,
      "order-description": "Online gift from Apollos",
      "order-id": `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}` || purchaseData.orderId,
    }, ...purchaseData}
  }

  if (!purchaseData["customer-vault-id"] && !purchaseData["customer-id"]) {
    sale.sale["add-customer"] = ""
  }

  console.log(sale)
  const builder = new Builder()
  const xml = builder.buildObject(sale)

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

export default step2
