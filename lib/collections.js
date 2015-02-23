var root;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.Campuses = new Mongo.Collection("campuses");

root.Funds = new Mongo.Collection("funds");

root.Locations = new Mongo.Collection("locations");

root.People = new Mongo.Collection("people");

root.SavedAccounts = new Mongo.Collection("savedAccounts");

root.ScheduledTransactions = new Mongo.Collection("scheduledTransactions");

root.Transactions = new Mongo.Collection("transactions");

Campuses.attachSchema(this.Campus);

Funds.attachSchema(this.Fund);

Locations.attachSchema(this.Location);

People.attachSchema(this.Person);

SavedAccounts.attachSchema(this.SavedAccount);

ScheduledTransactions.attachSchema(this.ScheduledTransaction);

Transactions.attachSchema(this.Transaction);