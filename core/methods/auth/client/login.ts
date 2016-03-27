/*global Meteor */

// login = args => Meteor.apply("Rock.login", args)
const login = (email, password, callback) => {
  Meteor.call("rock/auth/login", email, password, callback)
}

export default login
