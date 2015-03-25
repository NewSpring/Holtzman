MochaWeb?.testOnly ->
  describe "Rock isAlive function", ->
    
    it "should exist", ->
      chai.assert.isDefined Rock.isAlive
    it "should be a function", ->
      chai.assert.isFunction Rock.isAlive

    it "should call serverWatch with the correct key", (done) ->
      originalFunc = serverWatch.isAlive

      serverWatch.isAlive = (key) ->
        chai.assert.equal key, "Rock"
        done()

      Rock.isAlive()
      serverWatch.isAlive = originalFunc
