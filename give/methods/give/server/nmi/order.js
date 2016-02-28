/*global Meteor */

import { Builder } from "xml2js"
import { parseXML } from "../../../../../core/util"
import ErrorCodes from "./language"

const step2 = (purchaseData, method, callback) => {

  method || (method = "sale")
  const { ROOT_URL } = __meteor_runtime_config__
  let url = `${ROOT_URL}/give/now`

  const sale = {
    [method]: { ...{
      "api-key": Meteor.settings.nmi,
      "redirect-url": url,
      "order-description": "Online gift from Apollos",
      "order-id": `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}` || purchaseData.orderId,
    }, ...purchaseData }
  }

  if (!purchaseData["customer-vault-id"] && method === "sale") {
    sale.sale["add-customer"] = ""
  }

  let instant = false
  // if we are using a customer vault, no need for a redirect-url
  if (purchaseData["customer-vault-id"] && method === "add-subscription") {
    delete sale[method]["redirect-url"]
    instant = true
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

    // instant transaction
    if (instant) {

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
      return
    }

    if (data["result-code"] === "100") {
      let response = {
        url: data["form-url"],
        transactionId: data["transaction-id"]
      }
      callback(null, response)
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

export default step2
