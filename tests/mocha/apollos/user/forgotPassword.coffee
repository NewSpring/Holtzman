MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos", ->
    describe "user", ->
      describe "forgotPassword", ->

        it "should be defined", ->
          assert.isDefined Apollos.user.forgotPassword
        it "should be a function", ->
          assert.equal typeof Apollos.user.forgotPassword, "function"

        if Meteor.isClient

          before (done) ->
            @.timeout 10000
            Apollos.user.create "forgottest@newspring.cc", "password"
            Meteor.autorun ->
              user = Apollos.users.findOne 'emails.address': 'forgottest@newspring.cc'
              done() if user

          describe "when user exists", ->
            it "should not return an error", ->
              Apollos.user.forgotPassword "forgottest@newspring.cc", (error) ->
                assert.isUndefined error

          describe "when user does not exists", ->
            it "should return an error", ->
              Apollos.user.forgotPassword "forgot@password.com", (error) ->
                assert.isDefined error

