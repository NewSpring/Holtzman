###

  @TODO: Abstract to newspring:apollos-?

###

Apollos.campuses = new Mongo.Collection "campuses"

campus = Apollos.generateSchema
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
