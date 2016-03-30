/*global Meteor */

const reset = (email, callback) => {
  Meteor.call("rock/accounts/forceReset", email, callback)
}

export default reset
