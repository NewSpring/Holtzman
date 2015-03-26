MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'person', ->

      beforeEach ->
        Meteor.flush()

      before (done) ->
        if Meteor.isClient
          Meteor.logout()
          Meteor.autorun ->
            user = Apollos.user()
            done() if Object.keys(user).length is 0
        else
          done()

      it 'should be defined', ->
        assert typeof Apollos.person is 'function'
      it 'should return object', ->
        assert typeof Apollos.person() is 'object'

      describe 'when not signed in', ->

        if Meteor.isClient
          it 'should have no keys', ->
            assert.equal Object.keys(Apollos.person()).length, 0

      describe 'when signed in', ->

        if Meteor.isClient

          describe 'when no rock association', ->

            it 'should have no keys', ->
              assert.equal Object.keys(Apollos.person()).length, 0

          describe 'when rock association', ->

            before (done) ->
              Meteor.loginWithPassword 'apollos.person.keys@newspring.cc', 'testPassword', (err) ->
                assert.isUndefined err
              Meteor.autorun ->
                person = Apollos.user()
                done() if Object.keys(person).length > 0

            it 'should have updatedBy', ->
              assert typeof Apollos.person().updatedBy is 'string'
              assert.equal Apollos.person().updatedBy, 'Rock'
            it 'should have personId', ->
              assert typeof Apollos.person().personId is 'number'
              assert.equal Apollos.person().personId, 12345
            it 'should have givingGroupId', ->
              assert typeof Apollos.person().givingGroupId is 'number'
              assert.equal Apollos.person().givingGroupId, 1
            it 'should have guid', ->
              assert typeof Apollos.person().guid is 'string'
              assert.equal Apollos.person().guid, '12345678-1234-1234-1234-123456789012'
            it 'should have photoURL', ->
              assert typeof Apollos.person().photoURL is 'string'
              assert.equal Apollos.person().photoURL, 'http://newspring.cc'
            it 'should have photoId', ->
              assert typeof Apollos.person().photoId is 'number'
              assert.equal Apollos.person().photoId, 1
            it 'should have maritalStatusValueId', ->
              assert typeof Apollos.person().maritalStatusValueId is 'number'
              assert.equal Apollos.person().maritalStatusValueId, 1
            it 'should have firstName', ->
              assert typeof Apollos.person().firstName is 'string'
              assert.equal Apollos.person().firstName, 'Jim'
            it 'should have suffixValueId', ->
              assert typeof Apollos.person().suffixValueId is 'number'
              assert.equal Apollos.person().suffixValueId, 1
            it 'should have titleValueId', ->
              assert typeof Apollos.person().titleValueId is 'number'
              assert.equal Apollos.person().titleValueId, 1
            it 'should have lastName', ->
              assert typeof Apollos.person().lastName is 'string'
              assert.equal Apollos.person().lastName, 'Bo'
            it 'should have middleName', ->
              assert typeof Apollos.person().middleName is 'string'
              assert.equal Apollos.person().middleName, 'Tiberius'
            it 'should have gender', ->
              assert typeof Apollos.person().gender is 'number'
              assert.equal Apollos.person().gender, 1
            it 'should have preferredEmail', ->
              assert typeof Apollos.person().preferredEmail is 'string'
              assert.equal Apollos.person().preferredEmail, 'jim@tiberius.bo'
            it 'should have emailPreference', ->
              assert typeof Apollos.person().emailPreference is 'number'
              assert.equal Apollos.person().emailPreference, 1
            it 'should have homePhone', ->
              assert typeof Apollos.person().homePhone is 'string'
              assert.equal Apollos.person().homePhone, '1123456789'
            it 'should have workPhone', ->
              assert typeof Apollos.person().workPhone is 'string'
              assert.equal Apollos.person().workPhone, '1123456789'
            it 'should have cellPhone', ->
              assert typeof Apollos.person().cellPhone is 'string'
              assert.equal Apollos.person().cellPhone, '1123456789'
            it 'should have birthDay', ->
              assert typeof Apollos.person().birthDay is 'number'
              assert.equal Apollos.person().birthDay, 1
            it 'should have birthMonth', ->
              assert typeof Apollos.person().birthMonth is 'number'
              assert.equal Apollos.person().birthMonth, 1
            it 'should have birthYear', ->
              assert typeof Apollos.person().birthYear is 'number'
              assert.equal Apollos.person().birthYear, 2000
            it 'should have weddingDay', ->
              assert typeof Apollos.person().weddingDay is 'number'
              assert.equal Apollos.person().weddingDay, 1
            it 'should have weddingMonth', ->
              assert typeof Apollos.person().weddingMonth is 'number'
              assert.equal Apollos.person().weddingMonth, 1
            it 'should have weddingYear', ->
              assert typeof Apollos.person().weddingYear is 'number'
              assert.equal Apollos.person().weddingYear, 2000
            it 'should have personAliasIds', ->
              assert.isArray Apollos.person().personAliasIds
              assert.equal Apollos.person().personAliasIds[0], 1
              assert.equal Apollos.person().personAliasIds[1], 2
            it 'should have recordStatusValueId', ->
              assert typeof Apollos.person().recordStatusValueId is 'number'
              assert.equal Apollos.person().recordStatusValueId, 3
            it 'should have communicationPreference', ->
              assert typeof Apollos.person().communicationPreference is 'number'
              assert.equal Apollos.person().communicationPreference, 1


