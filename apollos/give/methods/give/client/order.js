/*global Meteor */

const order = (data, callback) => {
  Meteor.call("give/order", data, callback)
}

export default order
