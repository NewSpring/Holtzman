/*global _, Meteor */

import Error from "../error"
import { makeNewGuid } from "./../guid"

const api = {
  _: {}
}

// registration of required data for Rock
api.registerEndpoint = (obj) => {
  if (obj.tokenName && obj.token && obj.baseURL) {
    api._ = obj

    if (Meteor.isServer) {

      let { ROOT_URL } = __meteor_runtime_config__
      let current = api.get.sync(`DefinedValues?$filter=Value eq '${ROOT_URL}'`)

      if (!current.length) {
        let DefinedValue = {
          IsSystem: true,
          Order: 0,
          DefinedTypeId: 12,
          Value: ROOT_URL,
          Description: `Application at ${ROOT_URL}`,
          Guid: makeNewGuid()
        }
        current = api.post.sync("DefinedValues", DefinedValue)
        current = [{
          Id: current
        }]
      }

      api._.rockId = current[0].Id

      let site = api.get.sync(`Sites?$filter=Name eq '${ROOT_URL}'`)

      if (!site.length) {
        let Site = {
          IsSystem: false,
          Name: ROOT_URL,
          Description: `Application at ${ROOT_URL}`,
          Theme: "Rock",
          AllowIndexing: false,
          Guid: makeNewGuid(),
        }

        site = api.post.sync("Sites", Site)
        site = [{
          Id: site
        }]

      }

      api._.siteId = site[0].Id

      if (typeof serverWatch != "undefined") {
        // If Rock is being watched (aka old states), remove watching
        if (serverWatch.getKeys().indexOf("ROCK") != -1) {
          serverWatch.stopWatching("ROCK")
        }

        // Start watching again
        serverWatch.watch("ROCK", api._.baseURL, 30 * 1000)

      }
    }
  }
}

/*
  Rock.api.call
  @example make an api call to Rock
    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err
      console.log data
  @param method [String] CRUD Method desired
  @param endpoint [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response
 */

api.call = function (method, endpoint, data, callback) {

  function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      return {
        status: response.status,
        statusText: response.statusText
      }
    }
  }


  if (typeof data === "function") {
    callback = data
    data = {}
  }

  if (!this._.tokenName || !this._.token || !this._.baseURL) {
    throw new Error("Rock api credientials are missing")
  }


  const body = JSON.stringify(data)

  const headers = {
    [this._.tokenName]: this._.token,
    "Content-Type": "application/json"
  }

  const options = {
    method,
    body,
    headers,
    credentials: "same-origin"
  }

  endpoint = this._.baseURL + "api/" + endpoint
  return fetch(endpoint, options)
    .then(checkStatus)
    .then((response) => {
      if (response.status === 204) {
        return true
      }

      if (response.json) {
        return response.json()
      }

      return response

    })
    .then((data) => {
      if (callback) {
        callback(null, data)
      }

      return data

    })
    .catch((er) => {
      if (callback) {
        callback(er)
      }
      return er
    })
}


api.get = function () {
  let args
  args = _.values(arguments)
  args.unshift("GET")
  return api.call.apply(this, args)
}

api["delete"] = function () {
  let args
  args = _.values(arguments)
  args.unshift("DELETE")
  return api.call.apply(this, args)
}

api.put = function () {
  let args
  args = _.values(arguments)
  args.unshift("PUT")
  return api.call.apply(this, args)
}

api.post = function () {
  let args
  args = _.values(arguments)
  args.unshift("POST")
  return api.call.apply(this, args)
}

api.patch = function () {
  let args
  args = _.values(arguments)
  args.unshift("PATCH")
  return api.call.apply(this, args)

}

const parseEndpoint = (str) => {
  return str.split("\n").map((x) => {
    let trimmed = x.trim()
    if ( trimmed.slice(-3) === "and" ||  trimmed.slice(-2) === "or") {
      trimmed += " "
    }

    return trimmed
  }).join("")
}
api.parseEndpoint = parseEndpoint

if (Meteor.isServer) {
  for (const meth in api) {
    api[meth].sync = Meteor.wrapAsync(api[meth], api)
  }
}


export default {
  api,
  parseEndpoint,
}
