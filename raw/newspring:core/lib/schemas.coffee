###
  @author NewSpringWeb
  @abstract Holds the table schemas used by Apollos
####

###
 * @property [Campus] All the fields for a campus
 * Mapped to Rock:Campus
###
@Campus = new SimpleSchema(
  campusId:
    type: Number
  name:
    type: String
  shortCode:
    type: String
    max: 3
  description:
    type: String
  status:
    type: Number
  startDate:
    type: Date
  locationIds:
    type: [Number]
)

###
 * @property [Fund] All the fields for a giving fund
 * Mapped to Rock:FinancialAccount
###
@Fund = new SimpleSchema(
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

###
 * @property [GeoJSON] A MapBox object's defined coordinates
 * @see http://geojson.org/geojson-spec.html for official spec
###
@GeoJSON = new SimpleSchema(
  "type":
    type: String
    optional: true
    defaultValue: "Point"
  coordinates:
    type: [Number]
    decimal: true
    optional: true
    minCount: 2
    maxCount: 2
  isValid:
    type: Boolean
    optional: true
    defaultValue: true
)

###
 * @property [Location] All the fields for a location
 * Mapped to Rock:Location
 * LocationType:
 *     Person - Work, Home, Temporary
 *     Campus - Fuse, Service, Office, Mailing
 ###
@Location = new SimpleSchema(
  locationId:
    type: Number
  campusId:
    type: Number
  locationType:
    type: String
  shortCode:
    type: String
    max: 3
  street:
    type: String
  street2:
    type: String
  city:
    type: String
  state:
    type: String
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  zip:
    type: String
    regEx: /^$|\d{5}(-\d{4})?$/
    optional: true
  geometry:
    type: @GeoJSON
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
)


###
 * @property [Person] All the fields for a person
 * Mapped to Rock:Person
###
@Person = new SimpleSchema(
  personId:
    type: Number
    optional: true
  firstName:
    type: String
    optional: true
  nickName:
    type: String
    optional: true
  lastName:
    type: String
    optional: true
  email:
    type: String
    optional: true
  homePhone:
    type: Number
    max: 10
    optional: true
  cellPhone:
    type: Number
    max: 10
    optional: true
  campusId:
    type: Number
  familyGroupId:
    type: Number
  groupRole:
    type: String
  personAliasIds:
    type: [Number]
  locationIds:
    type: [Number]
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
)


###
 * @property [SavedAccount] All the fields for a saved account
 * Mapped to Rock:FinancialPersonBankAccount, Rock:FinancialPersonSavedAccount
 * Currency Types: Credit Card, ACH
 * Credit Types: Visa, MasterCard, AmEx, Discover, Diner's, JCB
 *
###
@SavedAccount = new SimpleSchema(
  savedAccountId:
    type: Number
  personAliasId:
    type: Number
  name:
    type: String
  accountMask:
    type: String
  currencyType:
    type: String
  creditCardType:
    type: String
  isEnabled:
    type: Boolean
    defaultValue: true
  paymentExpiration:
    type: Date
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
)

###
 * @property [Transaction] All the fields for a single transaction
 * Mapped to Rock:FinancialTransaction, Rock:FinancialTransactionDetail
 * Currency Types: Credit Card, ACH, Cash, Check
 * Credit Types: Visa, MasterCard, AmEx, Discover, Diner's, JCB
 * Name: Usually a summary of the transaction passed from Rock
 * Source: Website, Kiosk, Mobile, Onsite
 *
###
@Transaction = new SimpleSchema(
  transactionId:
    type: Number
  scheduledTransactionId:
    type: Number
  personAliasId:
    type: Number
  fundId:
    type: Number
  fundName:
    type: String
  fundAmount:
    type: Number
  transactionCode:
    type: String
  totalAmount:
    type: Number
  name:
    type: String
  source:
    type: String
  accountMask:
    type: String
  currencyType:
    type: String
  creditCardType:
    type: String
  submittedDate:
    type: Date
  processedDate:
    type: Date
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
)

###
 * @property [ScheduledTransaction] All the fields for a scheduled/recurring transaction
 * Mapped to Rock:ScheduledTransaction, Rock:ScheduledTransactionDetail
 * Frequency Types: Once, Weekly, Biweekly, Twice Monthly, Monthly, Quarterly, Yearly
 * Future Transaction: Holds transaction information for the next scheduled occurrence
###
@ScheduledTransaction = new SimpleSchema(
  scheduledTransactionId:
    type: Number
  personAliasId:
    type: Number
  frequencyId:
    type: Number
  frequencyType:
    type: String
  futureTransaction:
    type: @Transaction
  isEnabled:
    type: Boolean
  startDate:
    type: Date
  endDate:
    type: Date
  nextPayment:
    type: Date
  paymentExpiration:
    type: Date
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
)
