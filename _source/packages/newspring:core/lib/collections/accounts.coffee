Apollos.accounts = new Mongo.Collection "accounts"

account = Apollos.generateSchema
  accountId:
    type: Number
    decimal: false
  guid:
    type: String
    regEx: Apollos.regex.guid
  campusId:
    type: Number
    decimal: false
    optional: true
  name:
    type: String
  type:
    type: Number
    decimal: false
    optional: true
  startDate:
    type: Date
    optional: true
  endDate:
    type: Date
    optional: true
  isActive:
    type: Boolean
  publicName:
    type: String
  description:
    type: String

Apollos.accounts.attachSchema account
