
class profile.signIn extends Apollos.Component

  @register "profile.signIn"
  @card "Apollos.profile.onBoard"

  url: -> "sign-in"

  vars: -> [

    hasAccount: true
    hasErrors: false
    showForgotPassword: false

  ]

  email: -> @.parent()?.email

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

  ]


  onRendered: ->

    # bind email field changes to update parent if valid
    self = @
    showRegister = Apollos.Router.getQueryParam("register") is "true" or self.data()?.register is true

    if showRegister
      self.hasAccount.set false

    self.autorun ->
      children = {}
      for child in self.children()
        data = child.data()
        if not data.name
          continue

        children[data.name] = child

      email = children["email"].getValue()
      parent = self.parent()

      if email
        parent.email.set email



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
    else
      self.hasErrors.set false

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
        self.parent()?.dismiss()
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
        self.parent()?.dismiss()
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

  signinAnimation: ->
    return
    # $container = $('form').closest "section"
    # $container.css overflow: "hidden"
    # $('html').css overflow: "hidden"
    #
    # $button = $('form button')
    #
    # yPos = $button.offset().top + ($button.height() / 2)
    #
    # $backgroundDiv = $('<div class="signin-animation" />')
    # $signinMessage = $('<h2 class="signin-message">You\'ve Signed In Successfully</h2>')
    #
    # $backgroundDiv.css
    #   position: "absolute"
    #   left: "50%"
    #   top: yPos
    #   background: "#6BAC43"
    #   zIndex: 100
    #   borderRadius: "50%"
    #
    # $signinMessage.css
    #   position: "absolute"
    #   display: "none"
    #   width: "50%"
    #   textAlign: "center"
    #   padding: "20px"
    #   top: "40%"
    #   left: "25%"
    #   color: "#fff"
    #   zIndex: 200
    #
    # $backgroundDiv.append $signinMessage
    # $container.append $backgroundDiv
    #
    # buttonTwirl =
    #   e: $button
    #   p:
    #     rotateZ: "315deg"
    #
    # fillScreen =
    #   e: $backgroundDiv
    #   p: "transition.fillScreen"
    #
    # fadeInMessage =
    #   e: $signinMessage
    #   p: "transition.fadeIn"
    #
    # fadeOutAndDestroy =
    #   e: $backgroundDiv
    #   p: "transition.fadeOut"
    #   o:
    #     delay: 1500
    #
    #     complete: ->
    #       $container.css overflow: ""
    #       $('html').css overflow: ""
    #       $backgroundDiv.remove()
    #
    # signinSequence = [
    #   buttonTwirl
    #   fillScreen
    #   fadeInMessage
    #   fadeOutAndDestroy
    # ]
    #
    # $.Velocity.RunSequence(signinSequence)
