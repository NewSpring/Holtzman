###

  requiredIfNotFieldSet

  @example check to see if schema is representing the given state

    requiredIfNotFieldSet(schema, fieldName, value)

  @param schema [SimpleSchema] generally passed as @ or this
  @param fieldName [String] the name of a field within the schema
  @param value [String|Number] the value to check that the field is set to or,
  if ommitted, indicates that the field should simply be falsey

###
requiredIfNotFieldSet = (schema, fieldName, value) ->
  if value?
    isOfType = schema.field(fieldName).value == value
  else
    isOfType = not schema.field(fieldName).value?

  if isOfType and !schema.isSet and (!schema.operator or schemavalue == null or schema.value == '')
    return "required"


###
  Schema used for validating give transaction data
###
amountDetail = new SimpleSchema
  Amount:
    type: Number
  TargetAccountId:
    type: Number
    decimal: false

giveTransactionSchema = new SimpleSchema(
  SourceAccountId:
    decimal: false
    type: Number
    optional: true
  Email:
    type: String
    regEx: Apollos.regex.email
  AccountType:
    type: String
    optional: true
    regEx: /^(checking|savings|credit)$/
    custom: ->
      requiredIfNotFieldSet @, "SourceAccountId"
  AmountDetails:
    type: [amountDetail]
  AccountNumber:
    type: String
    optional: true
    custom: ->
      requiredIfNotFieldSet @, "SourceAccountId"
  RoutingNumber:
    type: String
    optional: true
    custom: ->
      requiredIfNotFieldSet(@, "AccountType", "checking") or requiredIfNotFieldSet @, "AccountType", "savings"
  CCV:
    type: String
    optional: true
    custom: ->
      requiredIfNotFieldSet @, "AccountType", "credit"
  ExpirationMonth:
    type: Number
    optional: true
    custom: ->
      requiredIfNotFieldSet @, "AccountType", "credit"
  ExpirationYear:
    type: Number
    optional: true
    custom: ->
      requiredIfNotFieldSet @, "AccountType", "credit"
  PersonId:
    type: Number
    decimal: false
    optional: true
  FirstName:
    type: String
  LastName:
    type: String
  Street1:
    type: String
  Street2:
    type: String
  City:
    type: String
  State:
    type: String
  PostalCode:
    type: String
  Country:
    type: String
  PhoneNumber:
    type: String
  CampusId:
    decimal: false
    type: Number
)

###

  Apollos.giveTransaction

  @example validate and pass transaction data to Rock

    Apollos.giveTransation(data)

  @param data [Object] give transaction info. see schema

###

Apollos.giveTransaction = (data) ->

  giveContext = giveTransactionSchema.newContext()

  return false unless giveContext.validate(data)
  
  Rock.apiRequest "POST", "api/Give", data, (error, data) ->
    if error
      debug "Apollos give transaction failed:"
      debug error
      return false

    return true
