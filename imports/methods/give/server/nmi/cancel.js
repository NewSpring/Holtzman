/* global Meteor */

import { Builder } from "xml2js";
import { parseXML } from "../../../../util";
import ErrorCodes from "./language";

const cancelTransaction = (transactionId, callback) => {
  const cancelTransactionObj = {
    "delete-subscription": {
      "api-key": Meteor.settings.nmi,
      "subscription-id": transactionId,
    },
  };

  const builder = new Builder();
  const xml = builder.buildObject(cancelTransactionObj);
  return fetch("https://secure.networkmerchants.com/api/v2/three-step", {
    method: "POST",
    body: `${xml}`,
    headers: {
      "Content-Type": "text/xml",
    },
  })
  .then((response) => response.text())
  .then((response) => {
    let data = response;
    try {
      data = parseXML(data);
    } catch (e) {
      callback(e);
      return;
    }
    if (data["result-code"] === "100") {
      callback(null, data);
      return;
    }

    // if the subscription isn't found in NMI, thats okay, let the app keep going
    if (data["result-text"].match(/No recurring subscriptions found/gmi)) {
      callback(null);
      return;
    }

    const number = Number(data["result-code"]);
    let err;
    if (ErrorCodes[number] && ErrorCodes[number] !== "result-text") {
      err = ErrorCodes[number];
    } else if (ErrorCodes[number] === "result-text") {
      err = data["result-text"];
    }

    callback({ message: err });
  })
  .catch(callback);
};

export default cancelTransaction;
