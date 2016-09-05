/*global Meteor */

const signup = (data, callback) => {
  Meteor.call("rock/accounts/signup", data, callback)
}

export default signup
