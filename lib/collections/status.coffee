Apollos.status = new Mongo.Collection "status"

status = Apollos.generateSchema
  name:
    type: String
    optional: false
  status:
    type: Boolean
    optional: false
  message:
    type: String
    optional: true


Apollos.status.attachSchema status
