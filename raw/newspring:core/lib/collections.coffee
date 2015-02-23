root = exports ? this

# Global access to Apollos tables
root.Campuses = new Mongo.Collection("campuses")
root.Funds = new Mongo.Collection("funds")
root.Locations = new Mongo.Collection("locations")
root.People = new Mongo.Collection("people")
root.SavedAccounts = new Mongo.Collection("savedAccounts")
root.ScheduledTransactions = new Mongo.Collection("scheduledTransactions")
root.Transactions = new Mongo.Collection("transactions")

# Enforce data schemas for Apollos tables
Campuses.attachSchema(@Campus)
Funds.attachSchema(@Fund)
Locations.attachSchema(@Location)
People.attachSchema(@Person)
SavedAccounts.attachSchema(@SavedAccount)
ScheduledTransactions.attachSchema(@ScheduledTransaction)
Transactions.attachSchema(@Transaction)
