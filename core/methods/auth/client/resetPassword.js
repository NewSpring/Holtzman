/*global Meteor */

const reset = (currentPassword, newPassword, callback) => {
  Meteor.call("rock/auth/reset", currentPassword, newPassword, callback)
}

export default reset
