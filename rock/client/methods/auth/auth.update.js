/*global Meteor */

const update = (data, callback) => {
  Meteor.call("Rock.auth.update", data, callback)
}

export default update
