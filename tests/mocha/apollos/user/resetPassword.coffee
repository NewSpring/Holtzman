MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos", ->
    describe "user", ->
      describe "resetPassword", ->

        it "should be defined", ->
          assert.isDefined Apollos.user.resetPassword
        it "should be a function", ->
          assert.equal typeof Apollos.user.resetPassword, "function"

        if Meteor.isClient

          describe "when reset token exists", ->

            it "should return error when token is wrong", ->
              Apollos.user.resetPassword "meow", "newPassword123", (error) ->
                assert.isDefined error

            it "should not return an error when token is right", ->
              Apollos.user.resetPassword "meowmeow", "newPassword123", (error) ->
                assert.isUndefined error

            it "should return an error when token has been used", ->
              Apollos.user.resetPassword "meowmeow", "newPassword123", (error) ->
                assert.isDefined error

          describe "when reset token does not exist", ->

            it "should return error", ->
              Apollos.user.resetPassword "kilimanjaro", "newPassword123", (error) ->
                assert.isDefined error





