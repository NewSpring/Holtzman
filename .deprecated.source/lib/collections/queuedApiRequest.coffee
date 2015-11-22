
Apollos.queuedApiRequests = new Mongo.Collection "queuedApiRequests"

queuedApiRequest = Apollos.generateSchema
  method:
    type: String
    regEx: /^(PATCH|PUT|POST|DELETE|GET)$/
  date:
    type: Date
    index: 1
  url:
    type: String
  headers:
    type: String
    optional: true
  data:
    type: String
    optional: true
  platform:
    type: String
    optional: true
  requestSent:
    type: Boolean
    defaultValue: false
    index: 1
  responseReceived:
    type: Boolean
    defaultValue: false
    index: 1
  responseError:
    type: String
    optional: true
  responseData:
    type: String
    optional: true
  isTest:
    type: Boolean
    defaultValue: false
  workerShouldDelete:
    type: Boolean

Apollos.queuedApiRequests.attachSchema queuedApiRequest
