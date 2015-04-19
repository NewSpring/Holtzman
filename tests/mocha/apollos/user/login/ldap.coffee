MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos.user.login.ldap function", ->

    if Meteor.isClient
      @.timeout 10000

    it "should exist as a function on the client and server", ->
      assert typeof Apollos.user.login.ldap is "function"

    if Meteor.isClient
      it "should call the meteor method from the client", (done) ->
        originalFunc = Meteor.call

        Meteor.call = (param1, param2, param3, param4) ->
          assert.isString param1
          assert.equal param1, "Apollos.user.login.ldap"
          assert.isString param2
          assert.equal param2, "bob@example.org"
          assert.isString param3
          assert.equal param3, "password123"
          assert.isFunction param4
          param4 null, "callbackParam"

        Apollos.user.login.ldap "bob@example.org", "password123", (error, result) ->
          assert.equal result, "callbackParam"
          Meteor.call = originalFunc
          done()

      it "should make this functionality available via Meteor method", (done) ->
        name = "Apollos.user.login.ldap"
        Meteor.call name, "bob@newspring.cc", "password123", (error, success) ->
          assert.isBoolean success
          done()

      it "should make an OAuth request asyncronously and return boolean", (done) ->
        Apollos.user.login.ldap "bob@newspring.cc", "password123", (error, success) ->
          assert.isBoolean success
          done()

      it "should make an OAuth request asyncronously and return undefined", (done) ->
        Apollos.user.login.ldap "bob@example.org", "password123", (error, success) ->
          assert.isUndefined success
          done()

      return

    if Meteor.isServer
      @.timeout 10000
      it "should make an LDAP request syncronously", ->
        success = Apollos.user.login.ldap "bob@newspring.cc", "password123"
        assert.isBoolean success

      it "should return undefined synchronously if not newspring email", ->
        success = Apollos.user.login.ldap "bob@gmail.cc", "password123"
        assert.isUndefined success
