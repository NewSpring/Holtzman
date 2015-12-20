
const signup = (email, password, callback) => {
  Meteor.call("Rock.auth.signup", email, password, callback)
}

export default signup
