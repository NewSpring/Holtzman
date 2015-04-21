Apollos.campuses = new Mongo.Collection "campuses"

campus = Apollos.generateSchema
  campusId:
    type: Number
  name:
    type: String
  shortCode:
    type: String
    max: 3
  description:
    type: String
  status:
    type: Number
  startDate:
    type: Date
  locationIds:
    type: [Number]


Apollos.campuses.attachSchema campus
