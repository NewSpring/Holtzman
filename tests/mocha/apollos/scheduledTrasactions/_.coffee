MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'scheduledTransactions', ->

      if Meteor.isServer

        before ->
          transactionProps =
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

          scheduledProps =
            scheduledTransactionId: 1
            personAliasId: 2
            frequencyId: 3
            frequencyType: 'Once'
            futureTransaction: transactionProps
            isEnabled: true
            startDate: new Date("01-01-2000 UTC")
            endDate: new Date("01-01-2001 UTC")
            nextPayment: new Date("02-01-2000 UTC")
            paymentExpiration: new Date("01-01-2002 UTC")

          Apollos.scheduledTransactions.insert scheduledProps

        it 'should exist', ->
          assert typeof Apollos.scheduledTransactions is 'object'

        it 'should have scheduledTransactionId', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.scheduledTransactionId is 'number'
          assert.equal s.scheduledTransactionId, 1

        it 'should have personAliasId', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.personAliasId is 'number'
          assert.equal s.personAliasId, 2

        it 'should have frequencyId', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.frequencyId is 'number'
          assert.equal s.frequencyId, 3

        it 'should have frequencyType', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.frequencyType is 'string'
          assert.equal s.frequencyType, 'Once'

        it 'should have futureTransaction', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.futureTransaction is 'object'
          # TODO fix

        it 'should have isEnabled', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.isEnabled is 'boolean'
          assert.equal s.isEnabled, true

        it 'should have startDate', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.startDate is 'object'
          assert.equal s.startDate.toDateString(), (new Date("01-01-2000 UTC").toDateString())

        it 'should have endDate', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.endDate is 'object'
          assert.equal s.endDate.toDateString(), (new Date("01-01-2001 UTC").toDateString())

        it 'should have nextPayment', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.nextPayment is 'object'
          assert.equal s.nextPayment.toDateString(), (new Date("02-01-2000 UTC").toDateString())

        it 'should have paymentExpiration', ->
          s = Apollos.scheduledTransactions.findOne()
          assert typeof s.paymentExpiration is 'object'
          assert.equal s.paymentExpiration.toDateString(), (new Date("01-01-2002 UTC").toDateString())
