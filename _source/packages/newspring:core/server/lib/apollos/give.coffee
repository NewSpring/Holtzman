###

  isAccountType

  @example check to see if schema is of a certain AccountType

    isAccountType(schema, type)

  @param schema [SimpleSchema] generally passed as @ or this
  @param type [String] the type of account compared to the schema's AccountType

###
isAccountType = (schema, type) ->
  isCredit = schema.field('AccountType').value == type
  if isCredit and !schema.isSet and (!schema.operator or schemavalue == null or schema.value == '')
    'required'

###
  Schema used for validating give transaction data
###
giveTransactionSchema = new SimpleSchema(
  Email:
    type: String
    regEx: Apollos.regex.email
  AccountType:
    type: String
    regEx: /^(checking|savings|credit)$/
  'AmountDetails.TargetAccountId':
    type: Number
  'AmountDetails.Amount':
    type: Number
  AccountNumber:
    type: String
  RoutingNumber:
    type: String
    optional: true
    custom: ->
      'required' if isAccountType(@, 'checking') or isAccountType(@, 'savings')
  CCV:
    type: String
    optional: true
    custom: ->
      'required' if isAccountType(@, 'credit')
  ExpirationMonth:
    type: Number
    optional: true
    custom: ->
      'required' if isAccountType(@, 'credit')
  ExpirationYear:
    type: Number
    optional: true
    custom: ->
      'required' if isAccountType(@, 'credit')
  AccountId:
    type: Number
    optional: true
  PersonId:
    type: Number
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

