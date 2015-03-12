/*

  Exported Variables to be used by other apps/packages

*/

Rock = {};
Apollos = {};
Campuses = {};
Fund = {};
Locations = {};
People = {};
SavedAccounts = {};
ScheduledTransactions = {};
Transactions = {};

/*

  Local Variables to be used across files in this app

*/
GeoJSON = {};
debug = function(){
  var log = console.log

  // if (Meteor.isClient) {
  //   log = __utils__ ? __utils__.echo : console.log
  // }

  log.apply(console, Array.prototype.slice.call(arguments));

}



var env = process.env.NODE_ENV

if (process.env.CI){
  env = "ci"
}

Settings = Meteor.settings[env]
