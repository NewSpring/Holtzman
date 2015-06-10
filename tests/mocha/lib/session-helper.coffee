@SessionHelper =

  logout: (done) ->
    Meteor.logout()
    Meteor.autorun ->
      user = Apollos.user()
      done() if Object.keys(user).length is 0

  login: (user, password, done) ->
    Meteor.loginWithPassword user, password, (err) ->
      chai.assert.isUndefined err
    Meteor.autorun ->
      person = Apollos.user()
      done() if Object.keys(person).length > 0

MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'SessionHelper', ->
    it 'should be defined', ->
      assert typeof SessionHelper is 'object'
    it 'should have a logout function', ->
      assert typeof SessionHelper.logout is 'function'
    it 'should have a login function', ->
      assert typeof SessionHelper.login is 'function'
