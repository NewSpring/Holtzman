MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->

      beforeEach ->
        Meteor.flush()

      it 'should be defined', ->
        assert typeof Apollos.user is 'function'
      it 'should return object', ->
        assert typeof Apollos.user() is 'object'

      describe 'when not signed in', ->

        it 'should have no keys', ->
          assert.equal Object.keys(Apollos.user()).length, 0

      describe 'when signed in', ->

        before ->
          Apollos.user.create 'apollos.user@newspring.cc', 'testPassword'
          @user = Meteor.users.findOne 'emails.address': 'apollos.user@newspring.cc'

        it 'should have id', ->
          assert typeof @user._id is 'string'
          assert @user._id.length > 0

        it 'should have emails', ->
          assert typeof @user.emails is 'array'
          assert.equals @user.emails[0].address, 'apollos.user@newspring.cc'
          assert.equals @user.emails[0].verified, false
