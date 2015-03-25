MochaWeb?.testOnly ->
  describe "Rock utilities object", ->

    it "should exist", ->
      chai.assert.isDefined Rock.utilities
    it "should be an object", ->
      chai.assert.isObject Rock.utilities
