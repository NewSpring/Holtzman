/*global Meteor */

import Meteor from "../../../../definitions/Meteor.d"

const join = (id : number, message : string, callback : Function) => {
  Meteor.call("community/actions/join", id, message, callback)
}

export {
  join
}
