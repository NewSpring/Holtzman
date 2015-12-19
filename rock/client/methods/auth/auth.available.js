
let available = () => {}

// need to think through way to hydrate this?
if (Meteor) {

  // available = args => Meteor.apply("Rock.login", args)
  available = (email, callback) => {
    Meteor.call("Rock.login", email, callback)
  }

}

export default available
