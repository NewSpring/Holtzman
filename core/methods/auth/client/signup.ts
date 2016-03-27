/*global Meteor */

const signup = (data, callback) => {
  Meteor.call("rock/auth/signup", data, callback)
}

export default signup
