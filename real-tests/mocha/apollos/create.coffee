MochaWeb?.testOnly ->

  assert = chai.assert

  _waitForEvent = (eventFunc, callback) ->
    success = eventFunc()

    if success
      callback()
    else
      _wait ->
        _waitForEvent eventFunc, callback

  _waitForLogin = (callback) ->
    _waitForEvent ->
      return Meteor.userId()
    , callback

  _wait = (func) ->
    Meteor.setTimeout func, 250

  _logout = (callback) ->
    Meteor.logout()
    _waitForEvent ->
      return not Meteor.userId()
    , callback

  describe "Apollos.create", ->

    if Meteor.isClient

      @.timeout 10000

      beforeEach (done) ->
        Meteor.flush()
        _logout done

      it "client should create user and login", (done) ->
        email = "apolloscreateclient@newspring.cc"
        Apollos.user.create email, "testPassword", (error) ->
          assert.isUndefined error
          _waitForLogin ->
            assert.equal Meteor.user().emails[0].address, email
            done()

      it "client should not create user if it exists", (done) ->
        email = "apolloscreateclient@newspring.cc"
        Apollos.user.create email, "testPassword", (error) ->
          assert.isDefined error
          done()

    else

      it "server should create user", ->
        userCount = Apollos.users.find().count()
        userId = Apollos.user.create "apolloscreateserver@newspring.cc", "testPassword"
        assert.isString userId
        assert.isTrue userId.length > 0

      it "server should not create user if it exists", (done) ->
        userCount = Apollos.users.find().count()
        try
          Apollos.user.create "apolloscreateserver@newspring.cc", "testPassword"
          assert.isFalse true # Shouldn"t get here because an error should be thrown
        catch error
          assert.equal error.reason, "Email already exists."
          done()
