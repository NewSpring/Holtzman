if not Meteor.isClient
  return

MochaWeb?.testOnly ->

  assert = chai.assert

  describe "Forgot Password", ->

    @.timeout 10000

    beforeEach (done) ->
      @.timeout 10000
      Meteor.flush()
      LoginHelper.logout ->
        LoginHelper.waitForVisibleForm done

    it "should present forgot password link on bad password", (done) ->
      LoginHelper.submitSignIn "apollos.person.keys@newspring.cc", "wrongPassword", ->
        LoginHelper.waitForForgotPasswordLink done

    it "should present forgot password form on click link", (done) ->
      LoginHelper.goToForgotPassword ->
        LoginHelper.getForgotPasswordBackButton().click()
        done()

    # it "should display password reset confirmation on submit", (done) ->
    #   email = "apollos.person.keys@newspring.cc"
    #   LoginHelper.submitForgotPassword email, ->
    #     LoginHelper.waitForPasswordResetConfirmation email, ->
    #       done()
