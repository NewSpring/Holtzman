/*global Meteor */

const charge = (token, name, id, callback) => {
  Meteor.call("give/charge", token, name, id, callback)
}

export default charge
