MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos", ->
    describe "transactions", ->

      if Meteor.isServer

        before ->
          props =
            transactionId: 1
            guid: Rock.utilities.makeNewGuid()
            sourceTypeValueId: 2
            creditCardTypeValueId: 3
            currencyTypeValueId: 4
            transactionDateTime: new Date("01-02-2000 UTC")

          Apollos.transactions.insert props

        it "should exist", ->
          assert typeof Apollos.transactions is "object"

        it "should have transactionId", ->
          t = Apollos.transactions.findOne()
          assert typeof t.transactionId is "number"
          assert.equal t.transactionId, 1

        it "should have guid", ->
          t = Apollos.transactions.findOne()
          assert typeof t.guid is "string"

        it "should have sourceTypeValueId", ->
          t = Apollos.transactions.findOne()
          assert typeof t.sourceTypeValueId is "number"
          assert.equal t.sourceTypeValueId, 2

        it "should have creditCardTypeValueId", ->
          t = Apollos.transactions.findOne()
          assert typeof t.creditCardTypeValueId is "number"
          assert.equal t.creditCardTypeValueId, 3

        it "should have currencyTypeValueId", ->
          t = Apollos.transactions.findOne()
          assert typeof t.currencyTypeValueId is "number"
          assert.equal t.currencyTypeValueId, 4

        it "should have transactionDateTime", ->
          t = Apollos.transactions.findOne()
          assert typeof t.transactionDateTime is "object"
          assert.equal t.transactionDateTime.toDateString(), (new Date("01-02-2000 UTC").toDateString())
