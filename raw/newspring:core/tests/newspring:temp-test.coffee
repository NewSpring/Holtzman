
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

    it 'should verify Apollos.createUser is a function', ->
      casper.then ->
        createUserIsAFunction = @.evaluate ->
          return typeof Apollos.createUser is "function"
        createUserIsAFunction.should.be.true
      return

    it 'should create an Apollos user', (done) ->

      casper.waitFor (->
        @.evaluate ->
          Apollos.createUser("richard.dubay@newspring.cc", "password", (err) ->
            false.should.be.true
            done()
          )
        return true
      ), ->
        @.echo "then"
      # casper.waitFor (->
      #
      #   test = @.evaluate ->
      #
      #     Apollos.createUser("richard.dubay@newspring.cc", "password", (err) ->
      #       if err
      #         __utils__.echo err
      #       else
      #         __utils__.echo "success"
      #       __utils__.echo "callback"
      #       done()
      #     )
      #
      #     return true
      #
      #   return test
      #
      # ), ->
      #
      #   count = @.evaluate ->
      #     return Meteor.users.find().count()
      #
      #   @.echo count
      #   @.echo "second callback"
      #   false.should.be.true
      return


  return
