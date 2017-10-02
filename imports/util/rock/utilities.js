/* eslint-disable no-param-reassign, prefer-rest-params */

import { Meteor } from "meteor/meteor";

import startup from "./startup";

const api = {
  _: {},
};

// registration of required data for Rock
api.registerEndpoint = obj => {
  if (obj.tokenName && obj.token && obj.baseURL) {
    api._ = obj;

    startup(api);
  }
};

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

api.call = function call(method, endpoint, data, callback) {
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    return {
      status: response.status,
      statusText: response.statusText,
    };
  }

  if (typeof data === "function") {
    callback = data;
    data = {};
  }

  if (!this._.tokenName || !this._.token || !this._.baseURL) {
    throw new Error("Rock api credientials are missing");
  }

  const body = JSON.stringify(data);

  const headers = {
    [this._.tokenName]: this._.token,
    "Content-Type": "application/json",
  };

  const options = {
    method,
    body,
    headers,
    credentials: "same-origin",
  };

  endpoint = `${this._.baseURL}api/${endpoint}`;
  // eslint-disable-next-line
  return fetch(endpoint, options)
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) {
        return true;
      }

      if (response.json) {
        return response.json();
      }

      return response;
    })
    .then(responseData => {
      if (callback) {
        callback(null, responseData);
      }

      return responseData;
    })
    .catch(er => {
      if (callback) {
        callback(er);
      }
      return er;
    });
};

api.get = function get() {
  const args = _.values(arguments);
  args.unshift("GET");
  return api.call.apply(this, args);
};

api.delete = function apiDelete() {
  const args = _.values(arguments);
  args.unshift("DELETE");
  return api.call.apply(this, args);
};

api.put = function put() {
  const args = _.values(arguments);
  args.unshift("PUT");
  return api.call.apply(this, args);
};

api.post = function post() {
  const args = _.values(arguments);
  args.unshift("POST");
  return api.call.apply(this, args);
};

api.patch = function patch() {
  const args = _.values(arguments);
  args.unshift("PATCH");
  return api.call.apply(this, args);
};

const parseEndpoint = str =>
  str
    .split("\n")
    .map(x => {
      let trimmed = x.trim();
      if (trimmed.slice(-3) === "and" || trimmed.slice(-2) === "or") {
        trimmed += " ";
      }

      return trimmed;
    })
    .join("");
api.parseEndpoint = parseEndpoint;

if (Meteor.isServer) {
  // eslint-disable-next-line
  for (const meth in api) {
    api[meth].sync = Meteor.wrapAsync(api[meth], api);
  }
}

export { api, parseEndpoint };
