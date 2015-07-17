Apollos.status = Apollos.generateCollection "status"

status = Apollos._generateSchema
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
