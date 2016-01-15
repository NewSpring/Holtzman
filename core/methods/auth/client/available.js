/*global Meteor */

const available = (email, callback) => {
  Meteor.call("rock/auth/available", email, callback)
}

export default available
