MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'savedAccounts', ->

      if Meteor.isServer

        before ->
          props =
            savedAccountId: 1
            personAliasId: 2
            name: 'Mr. Meow'
            accountMask: 'Mr. Mask'
            currencyType: 'ACH'
            creditCardType: 'Visa'
            isEnabled: true
            paymentExpiration: new Date('01-01-2020 UTC')

          Apollos.savedAccounts.insert props

        it 'should exist', ->
          assert typeof Apollos.savedAccounts is 'object'

        it 'should have savedAccountId', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.savedAccountId is 'number'
          assert.equal sa.savedAccountId, 1

        it 'should have personAliasId', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.personAliasId is 'number'
          assert.equal sa.personAliasId, 2

        it 'should have name', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.name is 'string'
          assert.equal sa.name, 'Mr. Meow'

        it 'should have accountMask', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.accountMask is 'string'
          assert.equal sa.accountMask, 'Mr. Mask'

        it 'should have currencyType', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.currencyType is 'string'
          assert.equal sa.currencyType, 'ACH'

        it 'should have isEnabled', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.isEnabled is 'boolean'
          assert.equal sa.isEnabled, true

        it 'should have paymentExpiration', ->
          sa = Apollos.savedAccounts.findOne()
          assert typeof sa.paymentExpiration is 'object'
          assert.equal sa.paymentExpiration.toDateString(), (new Date("01-01-2020 UTC").toDateString())
