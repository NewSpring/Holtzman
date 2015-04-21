MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->
      describe 'delete', ->

        if Meteor.isServer

          it 'should exist', ->
            assert.isDefined Apollos.user.delete

          it 'should be a function', ->
            assert typeof Apollos.user.delete is 'function'

          it 'should delete based on number', ->
            Apollos.user.create 'apollos.user.delete.number@newspring.cc', 'testPassword'
            user = Apollos.users.findOne 'emails.address': 'apollos.user.delete.number@newspring.cc'
            Apollos.users.update
              _id: user._id
            ,
              $set:
                'rock.userLoginId': 11111

            assert.equal Apollos.user.delete(11111, 'ROCK'), 1

          it 'should delete based on string', ->
            userId = Apollos.user.create 'apollos.user.delete.string@newspring.cc', 'testPassword'

            assert.equal Apollos.user.delete(userId, 'ROCK'), 1
