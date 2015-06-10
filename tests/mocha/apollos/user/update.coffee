MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->
      describe 'update', ->

        if Meteor.isServer

          it 'should exist', ->
            assert.isDefined Apollos.user.update

          it 'should be a function', ->
            assert typeof Apollos.user.update is 'function'

          describe 'when no user present', ->

            it 'should do nothing', ->
              user =
                Id: 23457
                PersonId: 23457
                Guid: '12345678-1234-1234-1234-123456789012'

              update = Apollos.user.update(user, "ROCK")
              assert.isUndefined update

          describe 'when user present', ->

            it 'should update', ->
              user =
                Id: 23456
                PersonId: 23457
                Guid: '12345678-1234-1234-1234-123456789012'

              updateId = Apollos.user.update(user, "ROCK")
              assert.isDefined updateId
              updatedUser = Apollos.users.findOne(updateId)
              assert.equal updatedUser.updatedBy, 'Rock'
