MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->
      describe 'forgotPassword', ->

        if Meteor.isClient
          before ->
            Apollos.user.forgotPassword 'apollos.person.keys@newspring.cc'

        it 'should be defined', ->
          assert.isDefined Apollos.user.forgotPassword
        it 'should be a function', ->
          assert.equal typeof Apollos.user.forgotPassword, 'function'

        if Meteor.isServer

          it 'should have a reset token', ->
            user = Apollos.users.findOne
              'emails.address': 'apollos.person.keys@newspring.cc'
            token = user.services.password.reset.token
            assert token.length > 0
