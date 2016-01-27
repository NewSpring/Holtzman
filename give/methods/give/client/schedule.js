/*global Meteor */

const schedule = (token, name, callback) => {
  Meteor.call("give/schedule", token, name, callback)
}

export default schedule
