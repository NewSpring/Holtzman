/*global Meteor */

import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const step2 = (purchaseData, method, callback) => {

  method || (method = "sale")
  let url = process.env.ROOT_URL ? `${process.env.ROOT_URL}/give` : "http://localhost:3000/give"
  // let url = "https://alpha.newspring.io/give"
  let authCode = `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}`
  const sale = {
    [method]: { ...{
      "api-key": Meteor.settings.nmi,
      "redirect-url": url,
      "order-description": "Online gift from Apollos",
      "order-id": `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}` || purchaseData.orderId,
      "authorization-code": purchaseData["authorization-code"] || authCode
    }, ...purchaseData }
  }

  if (!purchaseData["customer-vault-id"] && !purchaseData["customer-id"] && method === "sale") {
    sale.sale["add-customer"] = ""
  }

  const builder = new Builder()
  const xml = builder.buildObject(sale)

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

    callback(data["result-text"])

  })
  .catch(callback)


}

export default step2
