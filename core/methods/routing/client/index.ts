/*global Meteor */

const logRoute = (path, title, callback) => {
  Meteor.call("rock/routes/log", path, title, callback)
}

export default logRoute
