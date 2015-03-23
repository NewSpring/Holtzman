MochaWeb?.testOnly ->
  describe "Test", ->
    chai.assert.equal 5, 5

# describe 'Rock/Apollos User Sync Testing', ->

#   before ->
#     casper.start 'http://localhost:3000'
#     return

#   beforeEach (done) ->
#     casper.then ->
#       @.evaluate ->
#         # Need to write a delete method using a a testing shim
#         Meteor.logout()

#     done()

#   describe 'Verify Meteor', ->

#     it 'we should have a Meteor object', ->
#       casper.then ->
#         meteorIsAnObject = @.evaluate ->
#           return typeof Meteor is "object"
#         meteorIsAnObject.should.be.true
#       return

#   describe 'Create an Apollos account', ->

#     it 'should verify Apollos is loaded', ->
#       casper.then ->
#         apollosIsAnObject = @.evaluate ->
#           return typeof Apollos is "object"
#         apollosIsAnObject.should.be.true
#       return

#     it 'should verify Apollos.user.create is a function', ->
#       casper.then ->
#         userDotCreateIsAFunction = @.evaluate ->
#           return typeof Apollos.user.create is "function"
#         userDotCreateIsAFunction.should.be.true
#       return


#   #   it 'should create an Apollos user', (done) ->
#   #
#   #     casper.then ->
#   #
#   #       @.evaluate ->
#   #         Apollos.user.create(
#   #           "web@newspring.cc"
#   #           "testPassword"
#   #           (err, data) ->
#   #             if err
#   #               __utils__.echo err
#   #
#   #             window.userCreated = true
#   #
#   #         )
#   #
#   #     casper.waitFor (->
#   #       return @.getGlobal("userCreated") is true
#   #     ), ->
#   #       true.should.be.true
#   #       done()
