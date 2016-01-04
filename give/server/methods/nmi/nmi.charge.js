/*global Meteor */

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

  fetch("https://secure.networkmerchants.com/api/v2/three-step", {
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

    // clean all tags to make sure they are parseable
    let matches = data.match(/<([^>]+)>/gmi)

    for (let match of matches) {
      if (match.indexOf(",") > -1) {
        let matchRegex = new RegExp(match, "gmi")
        data = data.replace(matchRegex, match.replace(/,/gmi, ""))
      }
    }


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

export default step1
