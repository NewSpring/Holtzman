###

  @TODO: Abstract to newspring:apollos-?

###

Apollos.campuses = Apollos.generateCollection "campuses"

campus = Apollos._generateSchema
  campusId:
    type: Number
  name:
    type: String
  shortCode:
    type: String
  locationId:
    type: Number
    decimal: false
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid

Apollos.campuses.attachSchema campus

if Meteor.isServer
  Apollos.api.addEndpoint "campuses", "campus"
