MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'transactions', ->

      if Meteor.isServer

        before ->
          props =
            transactionId: 1
            scheduledTransactionId: 2
            personAliasId: 3
            fundId: 4
            fundName: 'Meow Fund'
            fundAmount: 5
            transactionCode: 6
            totalAmount: 7
            name: 'This happened'
            source: 'Website'
            accountMask: 'Mr. Mask'
            currencyType: 'ACH'
            creditCardType: 'Visa'
            submittedDate: new Date("01-01-2000 UTC")
            processedDate: new Date("01-02-2000 UTC")

          Apollos.transactions.insert props

          it 'should exist', ->
            assert typeof Apollos.transcations is 'object'

          it 'should have transactionId', ->
            t = Apollos.transactions.findOne()
            assert typeof t.transactionId is 'number'
            assert.equal t.transactionId, 1

          it 'should have scheduledTransactionId', ->
            t = Apollos.transactions.findOne()
            assert typeof t.scheduledTransactionId is 'number'
            assert.equal t.scheduledTransactionId, 2

          it 'should have personAliasId', ->
            t = Apollos.transactions.findOne()
            assert typeof t.personAliasId is 'number'
            assert.equal t.personAliasId, 3

          it 'should have fundId', ->
            t = Apollos.transactions.findOne()
            assert typeof t.fundId is 'number'
            assert.equal t.fundId, 4

          it 'should have fundName', ->
            t = Apollos.transactions.findOne()
            assert typeof t.fundName is 'string'
            assert.equal t.fundName, 'Meow Fund'

          it 'should have fundAmount', ->
            t = Apollos.transactions.findOne()
            assert typeof t.fundAmount is 'number'
            assert.equal t.fundAmount, 5

          it 'should have transactionCode', ->
            t = Apollos.transactions.findOne()
            assert typeof t.transactionCode is 'number'
            assert.equal t.transactionCode, 6

          it 'should have totalAmount', ->
            t = Apollos.transactions.findOne()
            assert typeof t.totalAmount is 'number'
            assert.equal t.totalAmount, 7

          it 'should have name', ->
            t = Apollos.transactions.findOne()
            assert typeof t.name is 'string'
            assert.equal t.name, 'This happened'

          it 'should have source', ->
            t = Apollos.transactions.findOne()
            assert typeof t.source is 'string'
            assert.equal t.source, 'Website'

          it 'should have accountMask', ->
            t = Apollos.transactions.findOne()
            assert typeof t.accountMask is 'string'
            assert.equal t.accountMask, 'Mr. Mask'

          it 'should have currencyType', ->
            t = Apollos.transactions.findOne()
            assert typeof t.currencyType is 'string'
            assert.equal t.currencyType, 'ACH'

          it 'should have creditCardtype', ->
            t = Apollos.transactions.findOne()
            assert typeof t.creditCardType is 'string'
            assert.equal t.creditCardType, 'Visa'

          it 'should have submittedDate', ->
            t = Apollos.transactions.findOne()
            assert typeof t.submittedDate is 'object'
            assert.equal t.submittedDate.toDateString, (new Date("01-01-2000 UTC").toDateString())

          it 'should have processedDate', ->
            t = Apollos.transactions.findOne()
            assert typeof t.processedDate is 'object'
            assert.equal t.processedDate.toDateString, (new Date("01-02-2000 UTC").toDateString())
