MochaWeb?.testOnly ->
  describe "Rock person function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.person
      return

    it "should exist", ->
      chai.assert.isDefined Rock.person
    it "should be a function", ->
      chai.assert.isFunction Rock.person
    it "should return an object", ->
      chai.assert.isObject Rock.person()
    it "should call translate", (done) ->
      originalMethod = Rock.person.translate
      Rock.person.translate = ->
        done()
      Rock.person()
      Rock.person.translate = originalMethod
