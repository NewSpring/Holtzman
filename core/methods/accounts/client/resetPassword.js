/*global Meteor */

const reset = (currentPassword, newPassword, callback) => {
  Meteor.call("rock/accounts/reset", currentPassword, newPassword, callback)
}

export default reset
