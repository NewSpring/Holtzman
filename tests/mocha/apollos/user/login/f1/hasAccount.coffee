MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos.user.login.f1.hasAccount function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        assert.isUndefined Apollos.user.login.f1.hasAccount
      return

    it "should exist as a function on the server", ->
      assert typeof Apollos.user.login.f1.hasAccount is "function"

    it "should accept a callback and run async", (done) ->
      Apollos.user.login.f1.hasAccount "email", (hasAccount) ->
        assert.isBoolean hasAccount
        done()

    it "should run sync if no callback", ->
      hasAccount = Apollos.user.login.f1.hasAccount "email"
      assert.isBoolean hasAccount
