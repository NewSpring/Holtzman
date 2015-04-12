MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'user', ->
      describe 'resetPassword', ->

        it 'should be defined', ->
          assert.isDefined Apollos.user.resetPassword
        it 'should be a function', ->
          assert.equal typeof Apollos.user.resetPassword, 'function'
