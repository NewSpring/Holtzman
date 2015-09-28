
Apollos.groupMembers = new Mongo.Collection "groupMembers"

groupMember = Apollos.generateSchema
  groupMemberId:
    type: Number
    decimal: false
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  groupId:
    type: Number
    decimal: false
  personId:
    type: Number
    decimal: false
  groupRoleId:
    type: Number
    decimal: false
    optional: true
  groupMemberStatus:
    type: Number
    decimal: false
    optional: true
  guestCount:
    type: Number
    decimal: false
    optional: true

Apollos.groupMembers.attachSchema groupMember
