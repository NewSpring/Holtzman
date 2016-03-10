/*global Meteor */

import { Builder } from "xml2js"
import { parseXML } from "../../../../../core/util"
import ErrorCodes from "./language"

const step1 = (token, callback) => {

  const complete = {
    "complete-action": {
      "api-key": Meteor.settings.nmi, // replace with settings file
      "token-id": token
    }
  }

  const builder = new Builder()
  const xml = builder.buildObject(complete)

  function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("The request to our payment process took longer than expected. For your saftey we have cancelled this action. You were not charged and should be able to try again!"))
      }, ms)
      promise.then(resolve, reject)
    })
  }

  return timeout(60000, fetch("https://secure.networkmerchants.com/api/v2/three-step", {
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


    // AVS mismatch can be sucessful transactions but some merchants
    // will keep holds on peoples accounts even if the transacton failed.
    // Here we send a void for  any transactions with an AVS
    // mismatch IF there was a failure
    // console.log(data)

    if (data["result-code"] === "100") {
      callback(null, data)
      return
    }

    let number = Number(data["result-code"])
    let err;

    // special mapping to ensure duplicates
    if (data["result-text"].indexOf("Duplicate") > -1) {
      number = 430
    }

    if (ErrorCodes[number] && ErrorCodes[number] != "result-text") {
      err = ErrorCodes[number]
    } else if (ErrorCodes[number] === "result-text")  {
      err = data["result-text"]
    }

    callback(err)

  })
  .catch(callback))


}

export default step1
