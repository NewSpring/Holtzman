MochaWeb?.testOnly ->

  assert = chai.assert

  if Meteor.isClient

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

    describe "Apollos", ->
      describe "create on the client", ->

        beforeEach (done) ->
          @.timeout 10000
          _logout done

        describe "when email does not exist in system", ->

          @.timeout 10000

          it "should create user and login", (done) ->
            email = "apolloscreateclient@newspring.cc"
            Apollos.user.create email, "testPassword", (error) ->
              assert.isUndefined error
              _waitForLogin ->
                assert.equal Meteor.user().emails[0].address, email
                done()

        describe "when email is in system", ->

          @.timeout 10000

          it "should not create user", (done) ->
            email = "apolloscreateclient@newspring.cc"
            Apollos.user.create email, "testPassword", (error) ->
              assert.isDefined error
              done()

  else

    describe "Apollos", ->
      describe "create on the server", ->

        beforeEach ->
          Meteor.flush()

        describe "when email does not exist in system", ->

          it "should create user", ->
            userCount = Apollos.users.find().count()
            userId = Apollos.user.create "apolloscreateserver@newspring.cc", "testPassword"
            assert.isString userId
            assert.isTrue userId.length > 0

        describe "when email is in system", ->

          it "should not create user", (done) ->
            userCount = Apollos.users.find().count()
            try
              Apollos.user.create "apolloscreateserver@newspring.cc", "testPassword"
              assert.isFalse true # Shouldn"t get here because an error should be thrown
            catch error
              assert.equal error.reason, "Email already exists."
              done()
