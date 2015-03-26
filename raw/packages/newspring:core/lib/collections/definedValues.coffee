Apollos.definedValues = new Mongo.Collection "definedValues"

Apollos.definedValues.allow
  insert: (userId, doc) ->
    return false
  update: (userId, doc) ->
    return false
  remove: (userId, doc) ->
    return false

definedValue = new SimpleSchema
  definedTypeGuid:
    type: String
    optional: false
    regEx: Apollos.regex.guid
  definedTypeId:
    type: Number
    optional: false
    decimal: false
  definedValueId:
    type: Number
    optional: false
    decimal: false
  value:
    type: String
    optional: false
  description:
    type: String
    optional: true
  definedValueGuid:
    type: String
    optional: false
    regEx: Apollos.regex.guid

Apollos.definedValues.attachSchema definedValue
