if not Meteor.isClient
  return

MochaWeb?.testOnly ->

  assert = chai.assert

  # Because I keep typing equals
  assert.equals = assert.equal

  _createdUserEmail = null

  _submitSignIn = (email, password, callback) ->
    _assertSignInVisible()
    _getEmailInput().val email
    _getPasswordInput().val password
    _getSubmitButton().click()
    _wait callback

  _submitSignUp = (email, password, accepted, callback) ->
    _goToSignUp ->
      _getEmailInput().val email
      _getPasswordInput().val password
      _getTermsInput().prop "checked", accepted
      _getSubmitButton().click()
      _wait callback

  _goToSignUp = (callback) ->
    _assertSignInVisible()
    email = _generateRandomEmail()
    _getEmailInput().val email
    _getEmailInput().blur()
    _wait ->
      _assertSignUpVisible()
      callback email

  _getVisibleForm = ->
    return $("form:visible")

  _getEmailInput = ->
    return _getVisibleForm().find "input[name=email]"

  _getPasswordInput = ->
    return _getVisibleForm().find "input[name=password]"

  _getTermsInput = ->
    return _getVisibleForm().find "input#terms"

  _getSubmitButton = ->
    return _getVisibleForm().find "button"

  _assertSignInVisible = ->
    assert.equal _getVisibleForm().attr("id"), "signin"

  _assertSignUpVisible = ->
    assert.equal _getVisibleForm().attr("id"), "signup"

  _wait = (func) ->
    Meteor.setTimeout func, 250

  _getRandomNumber = ->
    return Math.floor((Math.random() * 100000) + 1)

  _generateRandomEmail = ->
    return "newguy#{_getRandomNumber()}@gmail.com"

  _getCurrentUserEmail = ->
    return Meteor.user().emails[0].address

  _getErrorMessage = (name) ->
    return $("input[name=#{name}] ~ .input__status").text()

  _logout = (callback) ->
    Meteor.logout()
    Meteor.autorun ->
      if not Meteor.userId()
        callback()

  describe "Signin", ->

    beforeEach ->
      Meteor.flush()

    it "should start with the signin form", ->
      _assertSignInVisible()

    it "should have two inputs", ->
      _assertSignInVisible()
      assert.equal _getVisibleForm().find("input").length, 2
      assert.equal _getEmailInput().attr("name"), "email"
      assert.equal _getPasswordInput().attr("name"), "password"

    it "should deny signin submit if email is malformed", ->
      _submitSignIn "joe@joe", "password123", ->
        error = _getErrorMessage "email"
        assert.equal "Please enter a valid email", error
        done()

    it "should deny signin submit if password is empty", ->
      _submitSignIn "joe@joe.com", "", ->
        error = _getErrorMessage "email"
        assert.equal "Please enter a password", error
        done()

    it "should detect new email and present signup form", (done) ->
      _goToSignUp ->
        done()

    it "should show the terms checkbox on the signup form", (done) ->
      _goToSignUp ->
        assert.equal _getVisibleForm().find("input").length, 3
        assert.equal _getEmailInput().attr("name"), "email"
        assert.equal _getPasswordInput().attr("name"), "password"
        assert.equal _getTermsInput().attr("id"), "terms"
        done()

    it "should deny signup submit if email is malformed", (done) ->
      _submitSignUp "joe@joe", "password123", true, ->
        error = _getErrorMessage "email"
        assert.equal "Please enter a valid email", error
        done()

    it "should deny signup submit if password is empty", (done) ->
      _submitSignUp "joe@joe.com", "", true, ->
        error = _getErrorMessage "password"
        assert.equal "Password may not be empty", error
        done()

    it "should deny signup submit if terms are not accepted", (done) ->
      _submitSignUp "joe@joe.com", "password123", false, ->
        error = _getErrorMessage "terms"
        assert.equal "Please accept the terms", error
        done()

    it "should create a new user from the signup form", (done) ->
      _createdUserEmail = _generateRandomEmail()
      _submitSignUp _createdUserEmail, "password123", true, ->
        assert.equal Meteor.user().emails[0].address, _createdUserEmail
        _logout done

    it "should allow sign in of created user", (done) ->
      _submitSignIn _createdUserEmail, "password123", ->
        assert.equal Meteor.user().emails[0].address, _createdUserEmail
        _logout done
