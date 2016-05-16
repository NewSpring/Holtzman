/*global Meteor */

const join = (id, message, callback) => {
  Meteor.call("community/actions/join", id, message, callback)
}

export {
  join
}
