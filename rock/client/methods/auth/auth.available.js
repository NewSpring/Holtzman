
const available = (email, callback) => {
  Meteor.call("Rock.auth.available", email, callback)
}

export default available
