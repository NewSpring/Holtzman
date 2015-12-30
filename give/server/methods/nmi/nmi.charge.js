
import { Builder } from "xml2js"
import { parseXML } from "../../../../core/lib/util"

const step1 = (token, callback) => {

  const complete = {
    "complete-action": {
      "api-key": Meteor.settings.nmi, // replace with settings file
      "token-id": token
    }
  }

  const builder = new Builder()
  const xml = builder.buildObject(complete)

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

export default step1
