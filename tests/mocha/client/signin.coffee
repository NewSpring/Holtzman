if not Meteor.isClient
  return

MochaWeb?.testOnly ->

  assert = chai.assert

  _createdUserEmail = null

  describe "Signin", ->

    @.timeout 10000

    beforeEach (done) ->
      @.timeout 10000
      LoginHelper.logout ->
        LoginHelper.waitForVisibleForm done

    it "should start with the signin form", (done) ->
      LoginHelper.waitForSignInVisible done

    it "should have two inputs", (done) ->
      LoginHelper.waitForSignInVisible ->
        assert.equal LoginHelper.getVisibleForm().find("input").length, 2
        assert.equal LoginHelper.getEmailInput().attr("name"), "email"
        assert.equal LoginHelper.getPasswordInput().attr("name"), "password"
        done()

    it "should deny signin submit if email is malformed", (done) ->
      LoginHelper.submitSignIn "joe@joe", "password123", ->
        LoginHelper.waitForError "email", "Please enter a valid email", done

    it "should detect new email and present signup form", (done) ->
      LoginHelper.goToSignUp ->
        done()

    it "should show the terms checkbox on the signup form", (done) ->
      LoginHelper.goToSignUp ->
        assert.equal LoginHelper.getVisibleForm().find("input").length, 3
        assert.equal LoginHelper.getEmailInput().attr("name"), "email"
        assert.equal LoginHelper.getPasswordInput().attr("name"), "password"
        assert.equal LoginHelper.getTermsInput().attr("id"), "terms"
        done()

    it "should deny signup submit if email is malformed", (done) ->
      LoginHelper.submitSignUp "joe@joe", "password123", true, ->
        LoginHelper.waitForError "email", "Please enter a valid email", done

    it "should deny signup submit if password is empty", (done) ->
      LoginHelper.submitSignUp LoginHelper.generateRandomEmail(), "", true, ->
        LoginHelper.waitForError "password", "Password cannot be empty", done

    it "should deny signup submit if terms are not accepted", (done) ->
      LoginHelper.submitSignUp "joe@joe.com", "password123", false, ->
        LoginHelper.waitForError "terms", "You must accept the terms and conditions", done

    it "should create a new user from the signup form", (done) ->
      _createdUserEmail = LoginHelper.generateRandomEmail()
      LoginHelper.submitSignUp _createdUserEmail, "password123", true, ->
        LoginHelper.waitForLogin ->
          assert.equal Meteor.user().emails[0].address, _createdUserEmail
          done()

    it "should deny signin submit if password is empty", (done) ->
      LoginHelper.submitSignIn _createdUserEmail, "", ->
        LoginHelper.waitForError "password", "Password cannot be empty", done

    it "should allow sign in of created user", (done) ->
      LoginHelper.submitSignIn _createdUserEmail, "password123", ->
        LoginHelper.waitForLogin ->
          assert.equal Meteor.user().emails[0].address, _createdUserEmail
          done()
