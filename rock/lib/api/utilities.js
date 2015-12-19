
import { Error } from "../../../core/lib"

const api = {
  _: {}
}

// registration of required data for Rock
api.registerEndpoint = (obj) => {
  if (obj.tokenName && obj.token && obj.baseURL) {
    api._ = obj
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

api.call = function(method, endpoint, data, callback) {

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }


  if (typeof data === "function") {
    callback = data;
    data = {};
  }

  if (!this._.tokenName || !this._.token || !this._.baseURL) {
    throw new Error("Rock api credientials are missing");
    return;
  }


  const body = JSON.stringify(data);
  const headers = {
    [this._.tokenName]: this._.token,
    "Content-Type": "application/json"
  };

  const options = {
    method,
    body,
    headers,
    credentials: "same-origin"
  };

  if (method != "PUT" || method != "POST") {
    delete options.body
  }

  endpoint = this._.baseURL + "api/" + endpoint;

  return fetch(endpoint, options)
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      callback(null, data)
    })
    .catch((er) => {
      callback(er)
    })
};


api.get = function() {
  let args;
  args = _.values(arguments);
  args.unshift("GET");
  return api.call.apply(this, args);
};

api["delete"] = function() {
  let args;
  args = _.values(arguments);
  args.unshift("DELETE");
  return api.call.apply(this, args);
};

api.put = function() {
  let args;
  args = _.values(arguments);
  args.unshift("PUT");
  return api.call.apply(this, args);
};

api.post = function() {
  let args;
  args = _.values(arguments);
  args.unshift("POST");
  return api.call.apply(this, args);
};

api.patch = function() {
  let args;
  args = _.values(arguments);
  args.unshift("PATCH");
  return api.call.apply(this, args);

};


// for (const meth in api) {
//   api[meth].sync =
//   // apiSync[meth] = Meteor.wrapAsync(api.[meth], Rock.api);
// }

export default {
  api
}
