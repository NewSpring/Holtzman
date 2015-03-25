MochaWeb?.testOnly ->
  describe "Rock utilities.makeNewGuid function", ->

    it "should exist", ->
      chai.assert.isDefined Rock.utilities.makeNewGuid
    it "should be an object", ->
      chai.assert.isFunction Rock.utilities.makeNewGuid
    it "should make a guid", ->
      newGuid = Rock.utilities.makeNewGuid()
      chai.assert.isTrue Apollos.validate.isGuid newGuid
