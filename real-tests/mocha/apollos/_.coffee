MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos existence/attributes', ->

    beforeEach ->
      Meteor.flush()

    describe 'Verify Apollos', ->
      it 'should have loaded Apollos', ->
        assert typeof Apollos is 'object'

    describe 'Apollos attributes', ->

      it 'should have attribute name as a String', ->
        assert typeof Apollos.name is "string"

      it 'should have the name Apollos', ->
        assert.equal Apollos.name, 'Apollos'
