class Apollos.Profile.BillingAddress extends Apollos.Component
  @register "Apollos.Profile.BillingAddress"

  vars: -> [
    hasErrors: false
  ]

  onRendered: ->
    @.parent().title?.set "Billing Address"
    @.parent().checkForValidated()

  states: -> [
    {
      name: 'AL'
      val: 'AL'
    }
    {
      name: 'AK'
      val: 'AK'
    }
    {
      name: 'AS'
      val: 'AS'
    }
    {
      name: 'AZ'
      val: 'AZ'
    }
    {
      name: 'AR'
      val: 'AR'
    }
    {
      name: 'CA'
      val: 'CA'
    }
    {
      name: 'CO'
      val: 'CO'
    }
    {
      name: 'CT'
      val: 'CT'
    }
    {
      name: 'DE'
      val: 'DE'
    }
    {
      name: 'DC'
      val: 'DC'
    }
    {
      name: 'FM'
      val: 'FM'
    }
    {
      name: 'FL'
      val: 'FL'
    }
    {
      name: 'GA'
      val: 'GA'
    }
    {
      name: 'GU'
      val: 'GU'
    }
    {
      name: 'HI'
      val: 'HI'
    }
    {
      name: 'ID'
      val: 'ID'
    }
    {
      name: 'IL'
      val: 'IL'
    }
    {
      name: 'IN'
      val: 'IN'
    }
    {
      name: 'IA'
      val: 'IA'
    }
    {
      name: 'KS'
      val: 'KS'
    }
    {
      name: 'KY'
      val: 'KY'
    }
    {
      name: 'LA'
      val: 'LA'
    }
    {
      name: 'ME'
      val: 'ME'
    }
    {
      name: 'MH'
      val: 'MH'
    }
    {
      name: 'MD'
      val: 'MD'
    }
    {
      name: 'MA'
      val: 'MA'
    }
    {
      name: 'MI'
      val: 'MI'
    }
    {
      name: 'MN'
      val: 'MN'
    }
    {
      name: 'MS'
      val: 'MS'
    }
    {
      name: 'MO'
      val: 'MO'
    }
    {
      name: 'MT'
      val: 'MT'
    }
    {
      name: 'NE'
      val: 'NE'
    }
    {
      name: 'NV'
      val: 'NV'
    }
    {
      name: 'NH'
      val: 'NH'
    }
    {
      name: 'NJ'
      val: 'NJ'
    }
    {
      name: 'NM'
      val: 'NM'
    }
    {
      name: 'NY'
      val: 'NY'
    }
    {
      name: 'NC'
      val: 'NC'
    }
    {
      name: 'ND'
      val: 'ND'
    }
    {
      name: 'MP'
      val: 'MP'
    }
    {
      name: 'OH'
      val: 'OH'
    }
    {
      name: 'OK'
      val: 'OK'
    }
    {
      name: 'OR'
      val: 'OR'
    }
    {
      name: 'PW'
      val: 'PW'
    }
    {
      name: 'PA'
      val: 'PA'
    }
    {
      name: 'PR'
      val: 'PR'
    }
    {
      name: 'RI'
      val: 'RI'
    }
    {
      name: 'SC'
      val: 'SC'
    }
    {
      name: 'SD'
      val: 'SD'
    }
    {
      name: 'TN'
      val: 'TN'
    }
    {
      name: 'TX'
      val: 'TX'
    }
    {
      name: 'UT'
      val: 'UT'
    }
    {
      name: 'VT'
      val: 'VT'
    }
    {
      name: 'VI'
      val: 'VI'
    }
    {
      name: 'VA'
      val: 'VA'
    }
    {
      name: 'WA'
      val: 'WA'
    }
    {
      name: 'WV'
      val: 'WV'
    }
    {
      name: 'WI'
      val: 'WI'
    }
    {
      name: 'WY'
      val: 'WY'
    }
  ]
