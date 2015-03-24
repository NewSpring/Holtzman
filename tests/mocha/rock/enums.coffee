MochaWeb?.testOnly ->
  describe "Rock enums object", ->

    it "should exist", ->
      chai.assert.isDefined Rock.enums
    it "should be an object", ->
      chai.assert.isObject Rock.enums
    it "should contain genders", ->
      chai.assert.isDefined Rock.enums.genders
    it "should contain an array of genders", ->
      chai.assert.isArray Rock.enums.genders
    it "should contain all genders in the correct order", ->
      chai.assert.equal Rock.enums.genders.length, 3
      chai.assert.equal Rock.enums.genders[0], "Unknown"
      chai.assert.equal Rock.enums.genders[1], "Male"
      chai.assert.equal Rock.enums.genders[2], "Female"
