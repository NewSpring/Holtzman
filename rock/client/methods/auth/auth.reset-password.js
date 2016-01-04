/*global Meteor */

const reset = (currentPassword, newPassword, callback) => {
  Meteor.call("Rock.auth.reset", currentPassword, newPassword, callback)
}

export default reset
