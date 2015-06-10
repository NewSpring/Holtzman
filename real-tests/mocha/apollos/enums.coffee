MochaWeb?.testOnly ->
  describe "Apollos enums object", ->

    it "should exist", ->
      chai.assert.isDefined Apollos.enums
    it "should be an object", ->
      chai.assert.isObject Apollos.enums
    it "should contain accountType", ->
      chai.assert.isDefined Apollos.enums.accountType
    it "should contain an object of accountTypes", ->
      chai.assert.isObject Apollos.enums.accountType
    it "should contain all accountTypes in the correct order", ->
      chai.assert.equal Object.keys(Apollos.enums.accountType).length, 4
      chai.assert.equal Apollos.enums.accountType.none, 0
      chai.assert.equal Apollos.enums.accountType.apollos, 1
      chai.assert.equal Apollos.enums.accountType.f1, 2
      chai.assert.equal Apollos.enums.accountType.ldap, 3
