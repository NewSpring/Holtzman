/*global Meteor */

const charge = (token, name, callback) => {
  Meteor.call("give/charge", token, name, callback)
}

export default charge
