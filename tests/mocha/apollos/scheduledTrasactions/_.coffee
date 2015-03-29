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

          transactionId = Apollos.transactions.insert transactionProps

          scheduledProps =
            scheduledTransactionId: 1
            personAliasId: 2
            frequencyId: 3
            frequencyType: 'Once'
