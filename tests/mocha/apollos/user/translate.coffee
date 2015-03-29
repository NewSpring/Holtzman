MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->
      describe 'translate', ->

        if Meteor.isServer

          it 'should exist', ->
            assert.isDefined Apollos.user.translate

          it 'should be a function', ->
            assert typeof Apollos.user.translate is 'function'

          describe 'when no existing user', ->

            it 'should return blank user', ->
              translation = Apollos.user.translate()
              assert typeof translation is 'object'
              assert.equal translation.UserName, null
              assert.equal translation.ApollosHash, null

          describe 'when exisiting user', ->

            it 'should return that user', ->
              user =
                Id: 23456
                PersonId: 23456
                Guid: '12345678-1234-1234-1234-123456789012'

              translate = Apollos.user.translate(user, "ROCK")
              assert.equal translate.rock.userLoginId, 23456
              assert.equal translate.rock.personId, 23456
              assert.equal translate.rock.guid, '12345678-1234-1234-1234-123456789012'
              assert.equal translate.emails[0].address, 'apollos.person.keys@newspring.cc'

