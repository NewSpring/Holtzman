/*global Meteor */

const update = (data, callback) => {
  Meteor.call("rock/accounts/update", data, callback)
}

export default update
