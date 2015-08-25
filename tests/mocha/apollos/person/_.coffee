MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Apollos", ->
    describe "person", ->

      if Meteor.isClient

        beforeEach ->
          Meteor.flush()

        before (done) ->
          Meteor.logout()
          Meteor.autorun ->
            user = Apollos.user()
            done() if Object.keys(user).length is 0

        it "should be defined", ->
          assert typeof Apollos.person is "function"
        it "should return object", ->
          assert typeof Apollos.person() is "object"

        describe "when not signed in", ->

          it "should have no keys", ->
            assert.equal Object.keys(Apollos.person()).length, 0

        describe "when signed in", ->

          @.timeout 10000

          before (done) ->
            SessionHelper.logout(done)

          describe "when no rock association", ->

            before (done) ->
              SessionHelper.login("apollos.person.nokeys@newspring.cc", "testPassword", done)

            it "should have no keys", ->
              assert.equal Object.keys(Apollos.person()).length, 0

          describe "when rock association", ->

            before (done) ->
              SessionHelper.logout(done)

            describe "when active", ->

              before (done) ->
                SessionHelper.login("apollos.person.keys.test@newspring.cc", "testPassword", done)

              it "should have updatedBy", ->
                assert typeof Apollos.person().updatedBy is "string"
                assert.equal Apollos.person().updatedBy, "Apollos"
              it "should have personId", ->
                assert typeof Apollos.person().personId is "number"
                assert.equal Apollos.person().personId, 12349
              it "should have givingGroupId", ->
                assert typeof Apollos.person().givingGroupId is "number"
                assert.equal Apollos.person().givingGroupId, 1
              it "should have guid", ->
                assert typeof Apollos.person().guid is "string"
                assert.equal Apollos.person().guid, "12345678-1234-1234-1234-123456789123"
              it "should have photoURL", ->
                assert typeof Apollos.person().photoURL is "string"
                assert.equal Apollos.person().photoURL, "http://newspring.cc"
              it "should have photoId", ->
                assert typeof Apollos.person().photoId is "number"
                assert.equal Apollos.person().photoId, 1
              it "should have maritalStatusValueId", ->
                assert typeof Apollos.person().maritalStatusValueId is "number"
                assert.equal Apollos.person().maritalStatusValueId, 1
              it "should have firstName", ->
                assert typeof Apollos.person().firstName is "string"
                assert.equal Apollos.person().firstName, "Slim"
              it "should have suffixValueId", ->
                assert typeof Apollos.person().suffixValueId is "number"
                assert.equal Apollos.person().suffixValueId, 1
              it "should have titleValueId", ->
                assert typeof Apollos.person().titleValueId is "number"
                assert.equal Apollos.person().titleValueId, 1
              it "should have lastName", ->
                assert typeof Apollos.person().lastName is "string"
                assert.equal Apollos.person().lastName, "Ro"
              it "should have middleName", ->
                assert typeof Apollos.person().middleName is "string"
                assert.equal Apollos.person().middleName, "Titus"
              it "should have gender", ->
                assert typeof Apollos.person().gender is "number"
                assert.equal Apollos.person().gender, 1
              it "should have preferredEmail", ->
                assert typeof Apollos.person().preferredEmail is "string"
                assert.equal Apollos.person().preferredEmail, "slim@titus.ro"
              it "should have emailPreference", ->
                assert typeof Apollos.person().emailPreference is "number"
                assert.equal Apollos.person().emailPreference, 1
              it "should have homePhone", ->
                assert typeof Apollos.person().homePhone is "string"
                assert.equal Apollos.person().homePhone, "1123456789"
              it "should have workPhone", ->
                assert typeof Apollos.person().workPhone is "string"
                assert.equal Apollos.person().workPhone, "1123456789"
              it "should have cellPhone", ->
                assert typeof Apollos.person().cellPhone is "string"
                assert.equal Apollos.person().cellPhone, "1123456789"
              it "should have birthDay", ->
                assert typeof Apollos.person().birthDay is "number"
                assert.equal Apollos.person().birthDay, 1
              it "should have birthMonth", ->
                assert typeof Apollos.person().birthMonth is "number"
                assert.equal Apollos.person().birthMonth, 1
              it "should have birthYear", ->
                assert typeof Apollos.person().birthYear is "number"
                assert.equal Apollos.person().birthYear, 2000
              it "should have weddingDay", ->
                assert typeof Apollos.person().weddingDay is "number"
                assert.equal Apollos.person().weddingDay, 1
              it "should have weddingMonth", ->
                assert typeof Apollos.person().weddingMonth is "number"
                assert.equal Apollos.person().weddingMonth, 1
              it "should have weddingYear", ->
                assert typeof Apollos.person().weddingYear is "number"
                assert.equal Apollos.person().weddingYear, 2000
              it "should have aliases", ->
                assert.isArray Apollos.person().aliases
                assert.equal Apollos.person().aliases[0], 1
                assert.equal Apollos.person().aliases[1], 2
              it "should have recordStatusValueId", ->
                assert typeof Apollos.person().recordStatusValueId is "number"
                assert.equal Apollos.person().recordStatusValueId, 3
              it "should have communicationPreference", ->
                assert typeof Apollos.person().communicationPreference is "number"
                assert.equal Apollos.person().communicationPreference, 1
