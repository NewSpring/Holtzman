
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
      casper.then ->
        @.timeout = 10000
        @.evaluate ->
          # Apollos.createUser("richard.dubay@newspring.cc", "password", ->
          #   __utils__.echo JSON.stringify Meteor.users.find().count()
          #   # done()
          # )
          # Apollos.createUser("richard.dubay@newspring.cc", "password")
          __utils__.echo JSON.stringify Meteor.users.find().count()
          __utils__.echo "HI"
          Accounts.createUser
            email: "richard.dubay@newspring.cc"
            password: "password"
          __utils__.echo JSON.stringify Meteor.release
          done()
      return

      # casper.then ->
      #   @.evaluate ->
      #     __utils__.echo Meteor.users.find().count()
      # casper.waitFor ->
      #   @.evaluate ->
      #     email = "richard.dubay@newspring.cc"
      #     password = "password"
      #     Apollos.createUser(email, password)
      # casper.then ->
      #   userAccount = @.evaluate ->
      #     email = "richard.dubay@newspring.cc"
      #     password = "password"
      #     thisUser = null
      #     Apollos.createUser(email, password, ->
      #       __utils__.echo Meteor.users.find().count()
      #       thisUser = Meteor.users.findOne( { "emails.address" : email } )
      #     )
      #
      #     return thisUser
      #   @.echo userAccount
      #   createdUser.should.be.true
      # return
  return
