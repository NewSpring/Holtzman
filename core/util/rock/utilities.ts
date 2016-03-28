/*global _, Meteor */

import Error from "../error"
import startup from "./startup"
import Meteor from "../../../definitions/Meteor.d"

class FunctionWithSync extends Function {
    sync : Function
}

class API {
    _ : any
    registerEndpoint : FunctionWithSync
    call : FunctionWithSync
    get : FunctionWithSync
    post: FunctionWithSync
    put : FunctionWithSync
    delete : FunctionWithSync
    patch : FunctionWithSync
    parseEndpoint : FunctionWithSync
}

class Endpoint {
    tokenName : string
    token : string
    baseURL : string
}

const api : API = {

    _: {},

    // registration of required data for Rock
    registerEndpoint: (obj : Endpoint) : void => {
        if (obj.tokenName && obj.token && obj.baseURL) {
            api._ = obj

            startup(api)

        }
    },

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
    call: function (method : string, endpoint : string, data : Object, callback : Function) {

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

        if (!this._.tokenName || !this._.token || !this._.baseURL) {
            throw Error("Rock api credientials are missing")
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
    
        return fetch(endpoint, options).then(checkStatus).then((response) => {
        
            if (response.status === 204) {
                return true
            }

            if (response.json) {
                return response.json()
            }

            return response
        }).then((data) => {
            if (callback) {
                callback(null, data)
            }

            return data
        }).catch((er) => {
            if (callback) {
                callback(er)
            }
            
            return er
        })
    },


    get: function () {
        let args
        args = this._.values(arguments)
        args.unshift("GET")
        return api.call.apply(this, args)
    },

    delete: function () {
        let args
        args = this._.values(arguments)
        args.unshift("DELETE")
        return api.call.apply(this, args)
    },

    put: function () {
        let args
        args = this._.values(arguments)
        args.unshift("PUT")
        return api.call.apply(this, args)
    },

    post: function () {
        let args
        args = this._.values(arguments)
        args.unshift("POST")
        return api.call.apply(this, args)
    },

    patch: function () {
        let args
        args = this._.values(arguments)
        args.unshift("PATCH")
        return api.call.apply(this, args)
    },
    
    parseEndpoint: (str : string) : string => {
        return str.split("\n").map((x) => {
            let trimmed = x.trim()
            if ( trimmed.slice(-3) === "and" ||  trimmed.slice(-2) === "or") {
            trimmed += " "
            }

            return trimmed
        }).join("")
    }
}

if (Meteor.isServer) {
    for (const meth in api) {
        api[meth].sync = Meteor.wrapAsync(api[meth], api)
    }
}

export default api
