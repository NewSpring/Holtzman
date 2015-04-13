MochaWeb?.testOnly ->

  assert = chai.assert

  if Meteor.isClient

    describe 'Apollos', ->
      describe 'create on the client', ->

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

        describe 'when email does not exist in system', ->

          it 'should create user', (done) ->
            userCount = Apollos.users.find().count()
            Apollos.user.create 'apollos.create.client@newspring.cc', 'testPassword', (error) ->
              assert.isUndefined error
              assert.equal Apollos.users.find().count(), userCount + 1
              done()

        describe 'when email is in system', ->

          it 'should not create user', (done) ->
            userCount = Apollos.users.find().count()
            Apollos.user.create 'apollos.create.client@newspring.cc', 'testPassword', (error) ->
              assert.isDefined error
              assert.equal Apollos.users.find().count(), userCount
              done()

  else

    describe 'Apollos', ->
      describe 'create on the server', ->

        beforeEach ->
          Meteor.flush()

        describe 'when email does not exist in system', ->

          it 'should create user', ->
            userCount = Apollos.users.find().count()
            userId = Apollos.user.create 'apollos.create.server@newspring.cc', 'testPassword'
            assert.isString userId
            assert.isTrue userId.length > 0

        describe 'when email is in system', ->

          it 'should not create user', (done) ->
            userCount = Apollos.users.find().count()
            try
              Apollos.user.create 'apollos.create.server@newspring.cc', 'testPassword'
              assert.isFalse true # Shouldn't get here because an error should be thrown
            catch error
              assert.equal error.reason, "Email already exists."
              done()
