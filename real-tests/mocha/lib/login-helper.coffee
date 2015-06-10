@LoginHelper =

  waitForEvent: (eventFunc, callback) ->
    success = eventFunc()

    if success
      callback()
    else
      LoginHelper.wait ->
        LoginHelper.waitForEvent eventFunc, callback

  waitForLogin: (callback) ->
    LoginHelper.waitForEvent ->
      return Meteor.userId()
    , callback

  waitForError: (inputName, message, callback) ->
    LoginHelper.waitForEvent ->
      error = LoginHelper.getErrorMessage inputName
      return error is message
    , callback

  waitForForgotPasswordLink: (callback) ->
    LoginHelper.waitForEvent ->
      forgot = LoginHelper.getForgotPasswordLink()
      return forgot
    , callback

  waitForPasswordResetConfirmation: (email, callback) ->
    LoginHelper.waitForEvent ->
      confirmation = $('div.constrain-copy.push p').text().indexOf "Your password has been reset."
      return confirmation > -1
    , callback

  submitSignIn: (email, password, callback) ->
    LoginHelper.waitForSignInVisible ->
      LoginHelper.getEmailInput()
        .val email
        .blur()
      LoginHelper.getPasswordInput()
        .val password
        .blur()
      LoginHelper.getSubmitButton().click()
      callback()

  submitSignUp: (email, password, accepted, callback) ->
    LoginHelper.goToSignUp ->
      LoginHelper.getEmailInput()
        .val email
        .blur()
      LoginHelper.getPasswordInput()
        .val password
        .blur()

      LoginHelper.getTermsInput().prop "checked", accepted
      LoginHelper.getSubmitButton().click()
      callback()

  submitForgotPassword: (email, callback) ->
    LoginHelper.goToForgotPassword ->
      form = $('#forgot-password')
      input = $(form).find 'input[name=email]'
      submitButton = $(form).find 'button'
      $(input)
        .val email
        .blur()
      submitButton.click()
      callback()

  goToSignUp: (callback) ->
    LoginHelper.waitForSignInVisible ->
      email = LoginHelper.generateRandomEmail()
      LoginHelper.getEmailInput()
        .val email
        .blur()
      LoginHelper.waitForSignUpVisible ->
        callback email

  goToForgotPassword: (callback) ->
    LoginHelper.waitForSignInVisible ->
      LoginHelper.submitSignIn "apollos.person.keys@newspring.cc", "wrongPassword", ->
        LoginHelper.waitForForgotPasswordLink ->
          LoginHelper.waitForForgotPasswordVisible ->
            callback()

  getVisibleForm: ->
    return $("form:visible")

  getEmailInput: ->
    return LoginHelper.getVisibleForm().find "input[name=email]"

  getPasswordInput: ->
    return LoginHelper.getVisibleForm().find "input[name=password]"

  getTermsInput: ->
    return LoginHelper.getVisibleForm().find "input#terms"

  getSubmitButton: ->
    return LoginHelper.getVisibleForm().find "button"

  getForgotPasswordLink: ->
    return LoginHelper.getVisibleForm().find "[data-forgot-password=true]"

  getForgotPasswordBackButton: ->
    return LoginHelper.getVisibleForm().find "[data-forgot-password=true]"

  waitForSignInVisible: (callback) ->
    LoginHelper.waitForEvent ->
      $('[data-form=signin]').click()
      return LoginHelper.getVisibleForm().attr("id") is "signin"
    , callback

  waitForSignUpVisible: (callback) ->
    LoginHelper.waitForEvent ->
      $('[data-form=signup]').click()
      return LoginHelper.getVisibleForm().attr("id") is "signup"
    , callback

  waitForForgotPasswordVisible: (callback) ->
    LoginHelper.waitForEvent ->
      LoginHelper.getForgotPasswordLink().click()
      return LoginHelper.getVisibleForm().attr("id") is "forgot-password"
    , callback

  wait: (func) ->
    Meteor.setTimeout func, 250

  getRandomNumber: ->
    return Math.floor((Math.random() * 100000) + 1)

  generateRandomEmail: ->
    return "newguy#{LoginHelper.getRandomNumber()}@gmail.com"

  getCurrentUserEmail: ->
    return Meteor.user().emails[0].address

  getErrorMessage: (name) ->
    return $("input[name=#{name}] ~ .input__status").text()

  logout: (callback) ->
    Tracker.autorun (handle) ->
      if not Meteor.userId()
        callback()
        handle.stop()
    Meteor.logout()

  waitForVisibleForm: (callback) ->
    try
      if $ and $("form:visible").length
        LoginHelper.getEmailInput().val(null).blur()
        LoginHelper.getPasswordInput().val(null).blur()
        LoginHelper.wait callback
      else
        LoginHelper.wait ->
          LoginHelper.waitForVisibleForm callback
    catch error
      callback error

