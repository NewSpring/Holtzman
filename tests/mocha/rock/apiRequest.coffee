MochaWeb?.testOnly ->
  describe "Rock apiRequest function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.apiRequest
      return

    it "should exist", ->
      chai.assert.isDefined Rock.apiRequest
    it "should be a function", ->
      chai.assert.isFunction Rock.apiRequest
