Apollos.groupTypes = new Mongo.Collection "groupTypes"

groupType = Apollos.generateSchema
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  groupTypeId:
    type: Number
    decimal: false
  name:
    type: String
  description:
    type: String
    optional: true
  groupTerm:
    type: String
  groupMemberTerm:
    type: String


Apollos.groupTypes.attachSchema groupType
