MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'campuses', ->

      if Meteor.isServer

        it 'should exist', ->
          assert typeof Apollos.campuses is 'object'

