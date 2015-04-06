MochaWeb?.testOnly ->

  assert = chai.assert

  giveData = (type) ->

    data =
      email: 'jim@bo.com'
      amount: 20.00
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

    if type is 'credit'
      data.accountType = 'credit'
      data.accountNumber = '4111111111111111'
      data.ccv = '111'
      data.expirationMonth = 1
      data.expirationYear = 202
    else if type is 'checking'
      data.accountType = 'checking'
      data.accountNumber = '12345678912345'
      data.routingNumber = '123456789'

    data

  describe 'Apollos', ->
    describe 'give', ->

      if Meteor.isServer

        describe 'when using valid data', ->

          describe 'when using credit', ->

            it 'should complete transaction', ->
              data = giveData 'credit'
              assert.equal Apollos.giveTransaction(data), true

          describe 'when using checking', ->

            it 'should complete transaction', ->
              data = giveData 'checking'
              assert.equal Apollos.giveTransaction(data), true

        describe 'when using invalid data', ->

          it 'should not complete transaction', ->
            data = giveData 'credit'
            data.expirationMonth = '1'
            assert.equal Apollos.giveTransaction(data), false

        describe 'when using insufficent data', ->

          it 'should not complete transaction', ->
            data = giveData 'credit'
            data.ccv = null
            assert.equal Apollos.giveTransaction(data), false

