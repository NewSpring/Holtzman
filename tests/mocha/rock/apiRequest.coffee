MochaWeb?.testOnly ->

  _waitForEvent = (eventFunc, callback) ->
    success = eventFunc()

    if success
      callback()
    else
      _wait ->
        _waitForEvent eventFunc, callback

  _wait = (func) ->
    Meteor.setTimeout func, 250

  describe "Rock apiRequest function", ->

    @.timeout 10000

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.apiRequest
      return

    it "should exist", ->
      chai.assert.isDefined Rock.apiRequest
    it "should be a function", ->
      chai.assert.isFunction Rock.apiRequest

    it "should queue my request", (done) ->
      Apollos.queuedApiRequests.remove {}
      method = "PATCH"
      resource = "api/widgets/2"
      data = stuff: 10

      Rock.apiRequest method, resource, data, (error, data) ->
        chai.assert.equal error.error, "ERROR"
        chai.assert.equal data.data, "DATA"
        done()

      _waitForEvent ->
        request = Apollos.queuedApiRequests.findOne()

        if not request
          return false

        chai.assert.equal request.method, method
        chai.assert.notEqual request.url.indexOf(resource), -1
        chai.assert.equal request.data, JSON.stringify(data)
        return true
      , ->
        Apollos.queuedApiRequests.update
          _id: Apollos.queuedApiRequests.findOne()._id
        ,
          $set:
            responseReceived: true
            responseError: JSON.stringify error: "ERROR"
            responseData: JSON.stringify data: "DATA"
