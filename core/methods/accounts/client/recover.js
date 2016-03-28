/*global Meteor */

const recover = (email, personId, callback) => {
  Meteor.call("rock/accounts/recover", email, personId, callback)
}

export default recover
