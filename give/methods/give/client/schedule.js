/*global Meteor */

const schedule = (token, name, id, callback) => {
  Meteor.call("give/schedule", token, name, id, callback)
}

export default schedule
