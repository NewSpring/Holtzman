
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const step2 = (purchaseData, callback) => {

  const sale = {
    "sale": {...{
      "api-key": "8TM3Za26db2t9tpgJw7GY39fM4TJW2YF",
      "redirect-url": "http://localhost:3000/give",
      "order-description": "Online gift from Apollos",
      "order-id": `apollos_${Date.now()}_${Math.ceil(Math.random() * 100000)}` || purchaseData.orderId,
      "add-customer": ""
    }, ...purchaseData}
  }

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
      callback(e)
      return
    }

    if (data["result-code"] === "100") {
      callback(null, data)
      return
    }

    callback(data)

  })
  .catch(callback)


}

export default step2
