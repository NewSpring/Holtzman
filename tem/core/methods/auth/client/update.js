/*global Meteor */

const update = (data, callback) => {
  Meteor.call("rock/auth/update", data, callback)
}

export default update
