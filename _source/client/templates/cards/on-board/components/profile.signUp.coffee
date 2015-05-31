

class profile.signUp extends Apollos.Component

  @register "profile.signUp"
  @card "Apollos.profile.onBoard"
  url: "sign-up"

  vars: -> [

    hasAccount: true
    hasErrors: false
    showForgotPassword: false

  ]


  events: -> [

    "click [data-form]": @.toggleForm

    # remove showing password if they have retyped it
    "blur input[name=password]": (event) ->
      @.showForgotPassword.set false

    # on the fly email validation to determine if they have an account
    "blur input[name=email]": @.validateEmail

    # signin form handler
    "submit #signin": @.signin

    "submit #signup": @.signup

    # TODO fix link not working when using enter to submit form
    "click [data-forgot-password]": (event) ->

      self = @
      children = {}
      for child in self.children()
        data = child.data()
        if not data.name
          continue

        children[data.name] = child


      if event.target.dataset?.forgotPassword

        email = children["email"].getValue()

        parent = self.parent()

        if email
          parent.email.set email

        parent.passwordForget.set true



  ]


  toggleForm: (event) ->

    self = @

    if event.target.dataset?.form is "signin"
      self.hasAccount.set true

    if event.target.dataset?.form is "signup"
      self.hasAccount.set false


  validateEmail: (event) ->

    self = @

    email = event.target.value.toLowerCase()

    if not email
      self.hasErrors.set false
      return

    if not Apollos.validate.isEmail email
      self.hasErrors.set true

    Apollos.user.hasAccount email, (error, hasAccount) ->

      if error
        # Uh oh... what do we do here?
        Apollos.debug "ERROR: #{error}"

      self.hasAccount.set hasAccount



  login: (email, password) ->

    self = @
    children = {}
    for child in self.children("Apollos.Forms.Input")
      children[child.data().name] = child


    Apollos.loginWithPassword email, password, (err) ->
      if not err
        self.signinAnimation()
        return

      # wrong password
      if err.error is 403
        children["password"].setStatus "Password incorrect", true

        self.showForgotPassword.set true

      # no email
      if err.error is 400
        children["email"].setStatus "That email is already taken", true

    return


  signin: (event) ->

    self = @
    event.preventDefault()

    # get children inputs and map to object
    children = {}
    for child in self.children("Apollos.Forms.Input")
      children[child.data().name] = child

    email = self.find("input[name=email]").value.toLowerCase()
    password = self.find("input[name=password]").value

    if not Apollos.validate.isEmail email
      children["email"].setStatus true
      return

    if not password
      children["password"].setStatus "Password cannot be empty", true
      return

    self.login email, password


  createAccount: (email, password) ->

    self = @
    children = {}
    for child in self.children("Apollos.Forms.Input")
      children[child.data().name] = child

    Apollos.user.create email, password, (error) ->

      if not error
        self.signinAnimation()
        return

      # we need to test these Apollos.debug codes
      children["password"].setStatus "Password incorrect", true

      self.showForgotPassword.set true

      return


  signup: (event) ->

    self = @
    event.preventDefault()
    children = {}
    for child in self.children()
      data = child.data()
      if not data.name
        continue

      children[data.name] = child


    email = self.find("input[name=email]").value.toLowerCase()
    password = self.find("input[name=password]").value
    terms = self.find("input[name=terms]").checked

    if not Apollos.validate.isEmail email
      self.hasErrors.set true
      children["email"].setStatus true
      return

    if not password
      self.hasErrors.set true
      children["password"].setStatus "Password cannot be empty", true
      return

    if not terms
      self.hasErrors.set true
      children["password"].setStatus "You must accept the terms and conditions", true
      return


    Apollos.user.hasAccount email, (error, hasAccount) ->
      if error
        # Uh oh... what do we do here?
        Apollos.debug "ERROR: #{error}"

      if hasAccount
        self.login email, password
      else
        self.createAccount email, password
