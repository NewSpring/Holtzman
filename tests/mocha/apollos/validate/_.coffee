MochaWeb?.testOnly ->

  describe "Apollos validate object", ->

    it "should exist", ->
      chai.assert.isDefined Apollos.validate
    it "should be an object", ->
      chai.assert.isObject Apollos.validate
