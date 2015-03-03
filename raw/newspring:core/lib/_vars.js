Rock = {};
Apollos = {};
debug = function(){
  var log = console.log

  if (Meteor.isClient) {
    log = __utils__.echo || console.log
  }

  log.apply(null, arguments);

}

Campuses = new Mongo.Collection("campuses");
Funds = new Mongo.Collection("funds");
Locations = new Mongo.Collection("locations");
People = new Mongo.Collection("people");
SavedAccounts = new Mongo.Collection("savedAccounts");
ScheduledTransactions = new Mongo.Collection("scheduledTransactions");
Transactions = new Mongo.Collection("transactions");
