/*global Meteor */

const signup = (data, callback) => {
  Meteor.call('Rock.auth.signup', data, callback)
}

export default signup
