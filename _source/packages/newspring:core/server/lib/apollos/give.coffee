###
public string Email
public string AccountType { get; set; } "checking" or "savings" or "credit"
public array AmountDetails { get; set; } targetAccountId amount
public string AccountNumber { get; set; }
public string RoutingNumber { get; set; }
public string CCV { get; set; }
public int ExpirationMonth { get; set; }
public int ExpirationYear { get; set; }
public int? AccountId { get; set; }
public int? PersonId { get; set; }
public string FirstName { get; set; }
public string LastName { get; set; }
public string Street1 { get; set; }
public string Street2 { get; set; }
public string City { get; set; }
public string State { get; set; }
public string PostalCode { get; set; }
public string Country { get; set; }
public string PhoneNumber { get; set; }
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
    # custom: ->
    #   'required' if @.field('accountType').value in ['checking', 'savings']
  CCV:
    type: String
    optional: true
    # custom: ->
    #   'required' if @field('accountType').value == 'credit'
  ExpirationMonth:
    type: Number
    optional: true
  #   custom: ->
  #     'required' if @.field('accountType').value == 'credit'
  ExpirationYear:
    type: Number
    optional: true
  #   custom: ->
  #     'required' if @.field('accountType').value == 'credit'
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
)

Apollos.giveTransaction = (data) ->

  giveContext = giveTransactionSchema.newContext()

  return false unless giveContext.validate(data)

  Rock.apiRequest "POST", "api/Give", data, (error, data) ->
    if error
      debug "Apollos give transaction failed:"
      debug error
      return false

    return true

