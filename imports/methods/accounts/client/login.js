/*global Meteor */

// login = args => Meteor.apply("Rock.login", args)
const login = (email, password, callback) => {
  Meteor.call("rock/accounts/login", email, password, callback)
}

export default login
