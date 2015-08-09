
Apollos.locations = Apollos.generateCollection "locations"

location = Apollos._generateSchema
  locationId:
    type: Number
    decimal: false
    optional: true
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  foreignId:
    type: String
    optional: true
  parentLocationId:
    type: Number
    decimal: false
    optional: true
  name:
    type: String
    optional: true
  street1:
    type: String
    optional: true
  street2:
    type: String
    optional: true
  city:
    type: String
    optional: true
  state:
    type: String
    optional: true
  country:
    type: String
    optional: true
  postalCode:
    type: String
    optional: true

Apollos.locations.attachSchema location

if Meteor.isServer
  Apollos.api.addEndpoint "locations", "location"
