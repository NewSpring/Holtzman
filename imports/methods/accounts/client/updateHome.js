/*global Meteor */

const updateHome = (data, callback) => {
  Meteor.call("rock/accounts/updateHome", data, callback)
}

export default updateHome
