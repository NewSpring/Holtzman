MochaWeb?.testOnly ->
  describe "Rock person function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.person
      return

    it "should exist", ->
      chai.assert.isDefined Rock.person
