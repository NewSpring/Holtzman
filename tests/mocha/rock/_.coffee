MochaWeb?.testOnly ->
  describe "Rock object", ->

    it "should exist", ->
      chai.assert.isDefined Rock
    it "should be an object", ->
      chai.assert.isObject Rock
    it "should have the right name", ->
      chai.assert.equal Rock.name, "Rock"
    it "should have a baseURL", ->
      chai.assert.isString Rock.baseURL

    if Meteor.isServer
      it "should have a tokenName on the server", ->
        chai.assert.equal Rock.tokenName, "Authorization-Token"
      it "should have a token on the server", ->
        chai.assert.isString Rock.token
    else
      it "should not have a tokenName on client", ->
        chai.assert.isUndefined Rock.tokenName
      it "should not have a token on the client", ->
        chai.assert.isUndefined Rock.token
