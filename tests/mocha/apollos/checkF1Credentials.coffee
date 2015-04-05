MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos.checkF1Credentials function", ->

    it "should exist as a function on the client and server", ->
      assert typeof Apollos.checkF1Credentials is "function"

    if Meteor.isClient
      it "should call the meteor method from the client", (done) ->
        originalFunc = Meteor.call

        Meteor.call = (param1, param2, param3, param4) ->
          assert.isString param1
          assert.equal param1, "Apollos.checkF1Credentials"
          assert.isString param2
          assert.equal param2, "bob@example.org"
          assert.isString param3
          assert.equal param3, "password123"
          assert.isFunction param4
          param4 "callbackParam"

        Apollos.checkF1Credentials "bob@example.org", "password123", (result) ->
          assert.equal result, "callbackParam"
          Meteor.call = originalFunc
          done()

      it "should make this functionality available via Meteor method", (done) ->
        name = "Apollos.checkF1Credentials"
        Meteor.call name, "bob@example.org", "password123", (error, success) ->
          assert.isBoolean success
          done()

      return

    it "should make an OAuth request syncronously", ->
      success = Apollos.checkF1Credentials "bob@example.org", "password123"
      assert.isBoolean success

    it "should make an OAuth request asyncronously", (done) ->
      Apollos.checkF1Credentials "bob@example.org", "password123", (success) ->
        assert.isBoolean success
        done()
