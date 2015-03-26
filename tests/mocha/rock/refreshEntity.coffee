MochaWeb?.testOnly ->
  describe "Rock refreshEntity function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.refreshEntity
      return

    it "should exist", ->
      chai.assert.isDefined Rock.refreshEntity
    it "should be a function", ->
      chai.assert.isFunction Rock.refreshEntity
