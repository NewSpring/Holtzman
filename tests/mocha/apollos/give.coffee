MochaWeb?.testOnly ->

  assert = chai.assert

  giveData = (type) ->

    data =
      Email: 'jim@bo.com'
      AmountDetails:
        TargetAccountId: 1
        Amount: 1.00
      AccountId: 1
      PersonId: 1
      FirstName: 'Jim'
      LastName: 'Bo'
      Street1: '117 Cool St.'
      Street2: 'Apt. 24'
      City: 'Coolville'
      State: 'SC'
      PostalCode: '29681'
      Country: 'USA'
      PhoneNumber: '1123456789'

    if type is 'credit'
      data.AccountType = 'credit'
      data.AccountNumber = '4111111111111111'
      data.CCV = '111'
      data.ExpirationMonth = 1
      data.ExpirationYear = 202
    else if type in ['checking', 'savings']
      if type is 'checking'
        data.AccountType = 'checking'
      else if type is 'savings'
        data.AccountType = 'savings'

      data.AccountNumber = '12345678912345'
      data.RoutingNumber = '123456789'

    data

  stubRockApiRequest = ->
    originalApiRequest = Rock.apiRequest

    Rock.apiRequest = (method, url, data, callback) ->
      Rock.apiRequest = originalApiRequest
      true

  describe 'Apollos', ->
    describe 'giveTransaction', ->

      if Meteor.isServer

        describe 'when using valid data', ->

          describe 'when using credit', ->

            it 'should complete transaction', ->
              stubRockApiRequest()
              data = giveData 'credit'
              assert.equal Apollos.giveTransaction(data), true

            it 'should make api request', (done) ->
              originalApiRequest = Rock.apiRequest

              Rock.apiRequest = (method, url, data, callback) ->
                assert.equal method, "POST"
                assert.equal url, "api/Give"
                assert.equal data.Email, 'jim@bo.com'
                assert.equal data.AmountDetails.TargetAccountId, 1
                assert.equal data.AmountDetails.Amount, 1.00
                assert.equal data.AccountId, 1
                assert.equal data.PersonId, 1
                assert.equal data.FirstName, 'Jim'
                assert.equal data.LastName, 'Bo'
                assert.equal data.Street1, '117 Cool St.'
                assert.equal data.Street2, 'Apt. 24'
                assert.equal data.City, 'Coolville'
                assert.equal data.State, 'SC'
                assert.equal data.PostalCode, '29681'
                assert.equal data.Country, 'USA'
                assert.equal data.PhoneNumber, '1123456789'
                assert.equal data.AccountType, 'credit'
                assert.equal data.AccountNumber, '4111111111111111'
                assert.equal data.CCV, '111'
                assert.equal data.ExpirationMonth, 1
                assert.equal data.ExpirationYear, 202

                Rock.apiRequest = originalApiRequest
                done()

              data = giveData 'credit'
              Apollos.giveTransaction(data)


          describe 'when using checking', ->

            it 'should complete transaction', ->
              stubRockApiRequest()
              data = giveData 'checking'
              assert.equal Apollos.giveTransaction(data), true

          describe 'when using savings', ->

            it 'should complete transaction', ->
              stubRockApiRequest()
              data = giveData 'savings'
              assert.equal Apollos.giveTransaction(data), true

        describe 'when using invalid data', ->

          it 'should not complete transaction', ->
            stubRockApiRequest()
            data = giveData 'credit'
            data.expirationMonth = '1'
            assert.equal Apollos.giveTransaction(data), false
