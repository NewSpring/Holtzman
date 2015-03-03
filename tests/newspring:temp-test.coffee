
describe 'Rock/Apollos User Sync Testing', ->

  before ->
    casper.start 'http://localhost:3000'
    return

  describe 'Verify Meteor', ->

    it 'we should have a Meteor object', ->
      casper.then ->
        meteorIsAnObject = @.evaluate ->
          return typeof Meteor is "object"
        meteorIsAnObject.should.be.true
      return

  describe 'Create an Apollos account', ->

    it 'should verify Apollos is loaded', ->
      casper.then ->
        apollosIsAnObject = @.evaluate ->
          return typeof Apollos is "object"
        apollosIsAnObject.should.be.true
      return

    it 'should verify Apollos.user.create is a function', ->
      casper.then ->
        userDotCreateIsAFunction = @.evaluate ->
          return typeof Apollos.user.create is "function"
        userDotCreateIsAFunction.should.be.true
      return

    it 'should create an Apollos user', (done) ->

      casper.waitFor (->
        @.evaluate ->
          Apollos.user.create("richard.dubay@newspring.cc", "password", (err) ->
            false.should.be.true
            done()
          )
        return true
      ), ->
        @.echo "then"
      return


  return
