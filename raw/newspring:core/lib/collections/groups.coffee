Apollos.groups = new Mongo.Collection "groups"

member = new SimpleSchema
  personId:
    type: Number
  role:
    type: String
    allowedValues: Rock.constants.groupRoles

group = new SimpleSchema
  groupId:
    type: Number
    optional: true
  campusId:
    type: Number
    optional: true
  name:
    type: String
    optional: true
  type:
    type: String
    optional: true
    allowedValues: Rock.constants.groupTypes
  guid:
    type: String
    optional: true
    regEx: Apollos.regex.guid
  photoURL:
    type: String
    optional: true
  locationIds:
    type: [Number]
  members:
    type: [member]
  status:
    type: Number
    decimal: false
    allowedValues: Object.keys(Rock.constants.statuses).map (k) -> Number k
    optional: true

  createdDate:
    type: Date
    autoValue: ->
      if @.isInsert
        return new Date
      else if @.isUpsert
        return $setOnInsert: new Date
      else
        @.unset()

  updatedDate:
    type: Date
    autoValue: ->
      return new Date

Apollos.groups.attachSchema group
