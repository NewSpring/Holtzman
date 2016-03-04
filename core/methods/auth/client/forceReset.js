/*global Meteor */

const reset = (email, callback) => {
  Meteor.call("rock/auth/forceReset", email, callback)
}

export default reset
