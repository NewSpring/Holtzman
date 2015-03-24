MochaWeb?.testOnly ->
  describe "Rock isAlive function", ->
    it "should exist", ->
      chai.assert.isDefined Rock.isAlive
    it "should be a function", ->
      chai.assert.isFunction Rock.isAlive
    it "should return a boolean", ->
      chai.assert.isBoolean Rock.isAlive()
