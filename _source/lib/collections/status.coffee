Apollos.status = new Mongo.Collection "status"

status = Apollos.generateSchema
  name:
    type: String
    required: true
  status:
    type: Boolean
    required: true
  message:
    type: String
    required: false


Apollos.people.attachSchema status
