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
  ccv:
    type: String
  expirationMonth:
    type: Number
  expirationYear:
    type: Number
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

Apollos.giveTransaction = () ->
  data =
    email: 'jim@bo.com'
    accountType: 'checking'
    amount: 20.00
    accountNumber: '4111111111111111'
    ccv: '111'
    expirationMonth: 1
    expirationYear: 2020
    accountId: 1
    personId: 1
    firstName: 'Jim'
    lastName: 'Bo'
    street1: '117 Cool St.'
    street2: 'Apt. 24'
    city: 'Coolville'
    state: 'SC'
    postalCode: '29681'
    country: 'USA'
    phoneNumber: '1123456789'

  giveContext = giveTransactionSchema.newContext()
  return giveContext.validate(data)
