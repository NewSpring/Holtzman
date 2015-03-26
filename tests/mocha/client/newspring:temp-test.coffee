# MochaWeb?.testOnly ->
#
#   describe 'Rock/Apollos User Sync Testing', ->
#
#     before ->
#       Meteor.call 'velocity/isMirror', (err, isMirror) ->
#         if isMirror
#           console.log 'mirror'
#
#     beforeEach ->
#       Meteor.flush()
#
#     describe 'Verify Meteor', ->
#
#       it 'we should have a Meteor object', ->
#         chai.assert.equal typeof Meteor is "object", true
#
#     describe 'Create an Apollos account', ->
#
#       it 'should verify Apollos is loaded', ->
#         chai.assert.equal typeof Apollos is "object", true
#
#       it 'should verify Apollos.user.create is a function', ->
#         chai.assert.equal typeof Apollos.user.create is "function", true
#
#       # it 'should create an Apollos user', (done) ->
#       #   user = Apollos.user.create(
#       #     "web@newspring.cc"
#       #     "testPassword"
#       #     (err, data) ->
#       #       console.log err
#       #   )
#
#        # casper.then ->
#
#        #   @.evaluate ->
#        #     Apollos.user.create(
#        #       "web@newspring.cc"
#        #       "testPassword"
#        #       (err, data) ->
#        #         if err
#        #           __utils__.echo err
#
#        #         window.userCreated = true
#
#        #     )
#
#        # casper.waitFor (->
#        #   return @.getGlobal("userCreated") is true
#        # ), ->
#        #   true.should.be.true
#        #   done()
