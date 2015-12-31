// login = args => Meteor.apply("Rock.login", args)
const login = (currentPassword, newPassword, callback) => {
  Meteor.call("Rock.auth.reset", currentPassword, newPassword, callback)
}

export default login
