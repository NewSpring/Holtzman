
/*global Meteor, check */

import { api, parseEndpoint } from "../../../util/rock/utilities"

Meteor.methods({
  "file/upload": (file, id) => {

    const headers = {
      [api._.tokenName]: api._.token
    }

    let body = new Buffer(file, "base64")

    const options = {
      method: "POST",
      body,
      headers,
    }

    let url = parseEndpoint(`
      ImageUploader.ashx?
        isBinaryFile=True&
        IsTemporary=False&
        FileTypeGuid=03BD8476-8A9F-4078-B628-5B538F967AFC
    `)

    if (id) {
      url += `&fileId=${id}`
    }

    url = api._.baseURL + url

    console.log(url)

    const promiseWrapper = (promise, callback) => {
      promise.then((response) => {
        callback(null, response)
      })
      .catch((err) => {
        callback(err)
      })
    }

    let sync = Meteor.wrapAsync(promiseWrapper)

    return sync(fetch(url, options)
      .then((response) => {
        console.log(response)
        return response
      })
    )

  }
})
