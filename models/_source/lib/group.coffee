
Apollos.groups = Apollos.generateCollection "groups"

group = Apollos._generateSchema
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

if Meteor.isServer
  Apollos.api.addEndpoint "groups", "group"
