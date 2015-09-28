
Apollos.groups = new Mongo.Collection "groups"

group = Apollos.generateSchema
  groupId:
    type: Number
    decimal: false
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  foreignId:
    type: String
    optional: true
  parentGroupId:
    type: Number
    decimal: false
    optional: true
  groupTypeId:
    type: Number
    decimal: false
    optional: true
  campusId:
    type: Number
    decimal: false
    optional: true
  name:
    type: String
    optional: true

Apollos.groups.attachSchema group
