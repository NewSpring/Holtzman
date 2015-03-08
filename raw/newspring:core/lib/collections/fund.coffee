
Apollos.funds = new Mongo.Collection "funds"


###

  @property [Fund] All the fields for a giving fund
  Mapped to Rock:FinancialAccount

###
fund = new SimpleSchema(
  fundId:
    type: Number
  campusId:
    type: Number
  name:
    type: String
  publicName:
    type: String
  description:
    type: String
  "type":
    type: String
  startDate:
    type: Date
  endDate:
    type: Date
  isEnabled:
    type: Boolean
)

Apollos.funds.attachSchema fund
