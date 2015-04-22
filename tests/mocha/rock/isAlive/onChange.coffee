MochaWeb?.testOnly ->
  describe "Rock.isAlive.onChange function", ->

    it "should exist", ->
      chai.assert.isDefined Rock.isAlive.onChange
    it "should be a function", ->
      chai.assert.isFunction Rock.isAlive.onChange

    it "should call serverWatch with the correct key and callback", (done) ->
      originalFunc = serverWatch.onChange

      callback = (callbackParam) ->
        chai.assert.equal callbackParam, "CALLBACK PARAM"
        done()

      serverWatch.onChange = (param1, param2) ->
        chai.assert.equal param1, "Rock"
        chai.assert.equal param2, callback
        param2 "CALLBACK PARAM"

      Rock.isAlive.onChange callback

      serverWatch.onChange = originalFunc
