MochaWeb?.testOnly ->
  describe "Rock people function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.people
      return

    it "should exist", ->
      chai.assert.isDefined Rock.people
    it "should be an object", ->
      chai.assert.isObject Rock.people
    
