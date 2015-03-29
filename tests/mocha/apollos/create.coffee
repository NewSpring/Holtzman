MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'create', ->

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

        it 'should create user', ->
          userCount = Apollos.users.find().count()
          Apollos.user.create 'apollos.create@newspring.cc', 'testPassword'
          Meteor.setTimeout ->
            assert.equal Apollos.users.find().count(), userCount + 1
          , 100

      describe 'when email is in system', ->

        it 'should not create user', ->
          userCount = Apollos.users.find().count()
          Apollos.user.create 'apollos.create@newspring.cc', 'testPassword'
          Meteor.setTimeout ->
            assert.equal Apollos.users.find().count(), userCount
          , 100
