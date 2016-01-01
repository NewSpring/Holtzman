
const updateHome = (data, callback) => {
  Meteor.call("Rock.auth.updateHome", data, callback)
}

export default updateHome
