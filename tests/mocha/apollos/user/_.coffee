MochaWeb?.testOnly ->

  assert = chai.assert
  randomEmail = "newguy#{Date.now()}@gmail.com"

  describe "Apollos", ->
    describe "user", ->

      if Meteor.isClient

        beforeEach ->
          Meteor.flush()

        before (done) ->
          SessionHelper.logout(done)

        it "should be defined", ->
          assert typeof Apollos.user is "function"
        it "should return object", ->
          assert typeof Apollos.user() is "object"

        describe "when not signed in", ->

          it "should have no id", ->
            assert.isUndefined Apollos.user()._id
          it "should have no emails", ->
            assert.isUndefined Apollos.user().emails

        describe "when signed in", ->

          before (done) ->
            Apollos.user.create randomEmail, "testPassword"
            Tracker.autorun (handle) ->
              user = Apollos.users.findOne "emails.address": randomEmail
              if user
                done()
                handle.stop()

          it "should have id", ->
            user = Apollos.users.findOne "emails.address": randomEmail
            assert typeof user._id is "string"
            assert user._id.length > 0

          it "should have emails", ->
            user = Apollos.users.findOne "emails.address": randomEmail
            assert typeof user.emails is "object"
            assert.equal user.emails[0].address, randomEmail
            assert.equal user.emails[0].verified, false
