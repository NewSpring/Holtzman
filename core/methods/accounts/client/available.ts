/*global Meteor */

const available = (email, callback) => {
  Meteor.call("rock/accounts/available", email, callback)
}

export default available
