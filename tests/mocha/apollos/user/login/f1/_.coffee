MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos.user.login.f1 function", ->

    it "should exist as a function on the client and server", ->
      assert typeof Apollos.user.login.f1 is "function"

    if Meteor.isClient
      it "should call the meteor method from the client", (done) ->
        originalFunc = Meteor.call

        Meteor.call = (param1, param2, param3, param4) ->
          assert.isString param1
          assert.equal param1, "Apollos.user.login.f1"
          assert.isString param2
          assert.equal param2, "bob@example.org"
          assert.isString param3
          assert.equal param3, "password123"
          assert.isFunction param4
          param4 null, "callbackParam"

        Apollos.user.login.f1 "bob@example.org", "password123", (error, result) ->
          assert.equal result, "callbackParam"
          Meteor.call = originalFunc
          done()

      it "should make this functionality available via Meteor method", (done) ->
        name = "Apollos.user.login.f1"
        Meteor.call name, "bob@example.org", "password123", (error, success) ->
          assert.isUndefined error
          assert.isBoolean success
          done()

      it "should make an OAuth request asyncronously", (done) ->
        @.timeout 10000
        Apollos.user.login.f1 "bob@example.org", "password123", (error, success) ->
          assert.isBoolean success
          done()

    else
      it "should make an OAuth request syncronously", ->
        success = Apollos.user.login.f1 "bob@example.org", "password123"
        assert.isBoolean success
