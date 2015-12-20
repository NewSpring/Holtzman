
// login = args => Meteor.apply("Rock.login", args)
const login = (email, password, callback) => {
  Meteor.call("Rock.auth.login", email, password, callback)
}

export default login
