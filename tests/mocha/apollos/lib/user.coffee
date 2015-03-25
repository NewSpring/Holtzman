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

        if Meteor.isClient
          it 'should have no keys', ->
            assert.equal Object.keys(Apollos.user()).length, 0

      describe 'when signed in', ->

        if Meteor.isClient
          before (done) ->
            Apollos.user.create 'apollos.user@newspring.cc', 'testPassword'
            Meteor.autorun ->
              user = Apollos.users.findOne('emails.address': 'apollos.user@newspring.cc')
              done() if user

          it 'should have id', ->
            user = Apollos.users.findOne 'emails.address': 'apollos.user@newspring.cc'
            assert typeof user._id is 'string'
            assert user._id.length > 0

          it 'should have emails', ->
            user = Apollos.users.findOne 'emails.address': 'apollos.user@newspring.cc'
            assert typeof user.emails is 'object'
            assert.equal user.emails[0].address, 'apollos.user@newspring.cc'
            assert.equal user.emails[0].verified, false
