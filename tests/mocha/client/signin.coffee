if not Meteor.isClient
  return

MochaWeb?.testOnly ->

  assert = chai.assert
  assert.equals = assert.equal
  _createdUserEmail = null

  _waitForEvent = (eventFunc, callback) ->
    success = eventFunc()

    if success
      callback()
    else
      _wait ->
        _waitForEvent eventFunc, callback

  _waitForLogin = (callback) ->
    _waitForEvent ->
      return Meteor.userId()
    , callback

  _waitForError = (inputName, message, callback) ->
    _waitForEvent ->
      error = _getErrorMessage inputName
      return error is message
    , callback

  _submitSignIn = (email, password, callback) ->
    _waitForSignInVisible ->
      _getEmailInput()
        .val email
        .blur()
      _getPasswordInput()
        .val password
        .blur()
      _wait ->
        _getSubmitButton().click()
        callback()

  _submitSignUp = (email, password, accepted, callback) ->
    _goToSignUp ->
      _getEmailInput()
        .val email
        .blur()
      _getPasswordInput()
        .val password
        .blur()

      _getTermsInput().prop "checked", accepted
      _getSubmitButton().click()
      callback()

  _goToSignUp = (callback) ->
    _waitForSignInVisible ->
      email = _generateRandomEmail()
      _getEmailInput()
        .val email
        .blur()
      _waitForSignUpVisible ->
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

  _waitForSignInVisible = (callback) ->
    _waitForEvent ->
      return $("form#signin:visible").length is 1
    , callback

  _waitForSignUpVisible = (callback) ->
    _waitForEvent ->
      return $("form#signup:visible").length is 1
    , callback

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
    _waitForEvent ->
      return not Meteor.userId()
    , callback

  _waitForVisibleForm = (callback) ->
    _waitForEvent ->
      return $ and $("form:visible").length is 1
    , callback

  describe "Signin", ->

    @.timeout 10000

    before ->
      Router.go "/"

    beforeEach (done) ->
      @.timeout 10000
      Meteor.flush()
      _logout ->
        _waitForVisibleForm ->
          _getPasswordInput().val(null).blur()
          _getEmailInput().val(null).blur()
          _wait ->
            $("[data-form=signin]").click()
            _waitForSignInVisible done

    it "should start with the signin form", (done) ->
      _waitForSignInVisible done

    it "should have two inputs", (done) ->
      _waitForSignInVisible ->
        assert.equal _getVisibleForm().find("input").length, 2
        assert.equal _getEmailInput().attr("name"), "email"
        assert.equal _getPasswordInput().attr("name"), "password"
        done()

    it "should deny signin submit if email is malformed", (done) ->
      _submitSignIn "joe@joe", "password123", ->
        _waitForError "email", "Please enter a valid email", done

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
        _waitForError "email", "Please enter a valid email", done

    it "should deny signup submit if password is empty", (done) ->
      _submitSignUp _generateRandomEmail(), "", true, ->
        _waitForError "password", "Password cannot be empty", done

    it "should deny signup submit if terms are not accepted", (done) ->
      _submitSignUp "joe@joe.com", "password123", false, ->
        _waitForError "terms", "You must accept the terms and conditions", done

    it "should create a new user from the signup form", (done) ->
      _createdUserEmail = _generateRandomEmail()
      _submitSignUp _createdUserEmail, "password123", true, ->
        _waitForLogin ->
          assert.equal Meteor.user().emails[0].address, _createdUserEmail
          done()

    it "should deny signin submit if password is empty", (done) ->
      _submitSignIn _createdUserEmail, "", ->
        _waitForError "password", "Password cannot be empty", done

    it "should allow sign in of created user", (done) ->
      _submitSignIn _createdUserEmail, "password123", ->
        _waitForLogin ->
          assert.equal Meteor.user().emails[0].address, _createdUserEmail
          done()
