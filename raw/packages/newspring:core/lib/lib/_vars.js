//Exported Variables to be used by other apps/packages
Rock = {};
Apollos = {};

// Local Variables to be used across files in this app
GeoJSON = {};

debug = function() {
  var log = console.log

  // if (Meteor.isClient) {
  //   log = __utils__ ? __utils__.echo : console.log
  // }

  log.apply(console, Array.prototype.slice.call(arguments));

}


if (Meteor.isServer){

  if(!Meteor.settings || Object.keys(Meteor.settings).length === 0) {
    throw new Meteor.Error(
      "No settings",
      "Did you forget to specify --settings"
    );
  }

  var env = process.env.NODE_ENV

  if (process.env.CI){
    env = "ci"
  }

  //Meteor.settings = Meteor.settings[env]
};
