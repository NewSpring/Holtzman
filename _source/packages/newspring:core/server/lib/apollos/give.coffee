###
public string Email
public string AccountType { get; set; } "checking" or "savings" or "credit"
public decimal Amount { get; set; }
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
  email:
    type: String
    regEx: Apollos.regex.email
  accountType:
    type: String
    regEx: /^(checking|savings|credit)$/
  amount:
    type: Number
  accountNumber:
    type: String
  routingNumber:
    type: String
    optional: true
    custom: ->
      'required' if @.field('accountType') in ['checking', 'savings']
  ccv:
    type: String
    optional: true
    custom: ->
      'required' if @.field('accountType') == 'credit'
  expirationMonth:
    type: Number
    optional: true
    custom: ->
      'required' if @.field('accountType') == 'credit'
  expirationYear:
    type: Number
    optional: true
    custom: ->
      'required' if @.field('accountType') == 'credit'
  accountId:
    type: Number
    optional: true
  personId:
    type: Number
    optional: true
  firstName:
    type: String
  lastName:
    type: String
  street1:
    type: String
  street2:
    type: String
  city:
    type: String
  state:
    type: String
  postalCode:
    type: String
  country:
    type: String
  phoneNumber:
    type: String
)

Apollos.giveTransaction = (data) ->

  giveContext = giveTransactionSchema.newContext()
  unless giveContext.validate(data)
    return false

  return true
