MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos", ->
    describe "accounts", ->

      if Meteor.isServer

        before ->
          props =
            accountId: 1
            campusId: 2
            name: "Meow account"
            publicName: "Public Meow account"
            description: "The meow account is excellent"
            type: 1
            startDate: new Date("01-01-2000 UTC")
            endDate: new Date("01-01-2001 UTC")
            guid: Rock.utilities.makeNewGuid()
            isActive: true

          Apollos.accounts.insert props

        it "should exist", ->
          assert typeof Apollos.accounts is "object"

        it "should have a accountId", ->
          account = Apollos.accounts.findOne()
          assert typeof account.accountId is "number"
          assert.equal account.accountId, 1

        it "should have a campusId", ->
          account = Apollos.accounts.findOne()
          assert typeof account.campusId is "number"
          assert.equal account.campusId, 2

        it "should have a name", ->
          account = Apollos.accounts.findOne()
          assert typeof account.name is "string"
          assert.equal account.name, "Meow account"

        it "should have a publicName", ->
          account = Apollos.accounts.findOne()
          assert typeof account.publicName is "string"
          assert.equal account.publicName, "Public Meow account"

        it "should have a description", ->
          account = Apollos.accounts.findOne()
          assert typeof account.description is "string"
          assert.equal account.description, "The meow account is excellent"

        it "should have a type", ->
          account = Apollos.accounts.findOne()
          assert typeof account.type is "number"
          assert.equal account.type, 1

        it "should have a startDate", ->
          account = Apollos.accounts.findOne()
          assert typeof account.startDate is "object"
          assert.equal account.startDate.toDateString(), (new Date("01-01-2000 UTC").toDateString())

        it "should have an endDate", ->
          account = Apollos.accounts.findOne()
          assert typeof account.endDate is "object"
          assert.equal account.endDate.toDateString(), (new Date("01-01-2001 UTC").toDateString())

        it "should have an isActive", ->
          account = Apollos.accounts.findOne()
          assert typeof account.isActive is "boolean"
          assert.equal account.isActive, true
