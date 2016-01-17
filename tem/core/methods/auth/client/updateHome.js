/*global Meteor */

const updateHome = (data, callback) => {
  Meteor.call("rock/auth/updateHome", data, callback)
}

export default updateHome
