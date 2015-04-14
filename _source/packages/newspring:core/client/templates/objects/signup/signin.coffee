
class Signin

  constructor: (template) ->

    @.template = template


  login: (email, password) =>

    self = @
    template = self.template

    Meteor.loginWithPassword email, password, (err) ->
      if not err
        return

      # wrong password
      if err.error is 403
        passwordTemplate = template.password.get()
        passwordTemplate.methods.setStatus "Password incorrect", true

        template.showForgotPassword.set true

      # no email
      if err.error is 400
        emailTemplate = template.email.get()
        emailTemplate.methods.setStatus "That email is already taken", true

    return

  createAccount: (email, password) =>

    self = @
    template = self.template

    Apollos.user.create email, password, (error) ->

      if not error
        return


      debug error

      # we need to test these debug codes
      passwordTemplate = template.password.get()
      passwordTemplate.methods.setStatus "Password incorrect", true

      template.showForgotPassword.set true

      return

  createAccountFromF1 = (email, password) =>

    self = @
    template = self.template

    Apollos.user.login.f1 email, password, (error, success) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"
        passwordTemplate = template.password.get()
        passwordTemplate.methods.setStatus "Password incorrect", true
        template.showForgotPassword.set true
        return

      if success
        self.createAccount email, password
        return




Template.signin.onCreated ->

  self = @

  self._ = new Signin self

  if self.data?.bind
    parentLink = self.data.bind.get()
    parentLink.methods = self._
    self.data.bind.set parentLink


  self.hasAccount = new ReactiveVar(true)
  self.hasErrors = new ReactiveVar(false)
  self.showForgotPassword = new ReactiveVar(false)

  self.email = new ReactiveVar({
    methods: null
    parent: self
  })

  self.password = new ReactiveVar({
    methods: null
    parent: self
  })

  self.terms = new ReactiveVar({
    methods: null
    parent: self
  })



Template.signin.helpers

  # states
  "hasAccount": ->
    return Template.instance().hasAccount.get()

  "hasErrors": ->
    return Template.instance().hasErrors.get()

  "showForgotPassword": ->
    return Template.instance().showForgotPassword.get()


  # children templates
  "email": ->
    return Template.instance().email

  "password": ->
    return Template.instance().password

  "terms": ->
    return Template.instance().terms






Template.signin.events

  # toggle binding
  "click [data-form]": (event, template) ->

    if event.target.dataset?.form is "signin"
      template.hasAccount.set true

    if event.target.dataset?.form is "signup"
      template.hasAccount.set false



  # remove showing password if they have retyped it
  "blur input[name=password]": (event, template) ->
    template.showForgotPassword.set false



  # on the fly email validation to determine if they have an account
  "blur input[name=email]": (event, template) ->

    email = event.target.value.toLowerCase()

    if not email
      template.hasAccount.set true

    Apollos.user.getAccountType email, (error, accountType) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"

      types = Apollos.enums.accountType

      switch accountType
        when types.apollos, types.f1, types.ldap
          template.hasAccount.set true
        else
          template.hasAccount.set false



  # signin form handler
  "submit #signin": (event, template) ->
    event.preventDefault()

    email = template.find("input[name=email]").value.toLowerCase()
    password = template.find("input[name=password]").value

    if not Apollos.validate.isEmail email
      emailTemplate = template.email.get()
      emailTemplate.methods.setStatus true
      return

    if not password
      passwordTemplate = template.password.get()
      passwordTemplate.methods.setStatus "Password cannot be empty", true
      return

    Apollos.user.getAccountType email, (error, accountType) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"

      types = Apollos.enums.accountType

      switch accountType
        when types.apollos, types.ldap
          template._.login email, password
          # when types.ldap
          #   loginWithLDAP email, password, template
        when types.f1
          template._.createAccountFromF1 email, password, template
        else
          template.hasAccount.set false



  # signup form handler
  "submit #signup": (event, template) ->
    event.preventDefault()

    email = template.find("input[name=email]").value.toLowerCase()
    password = template.find("input[name=password]").value
    terms = template.find("input[name=terms]").checked

    if not Apollos.validate.isEmail email
      emailTemplate = template.email.get()
      emailTemplate.methods.setStatus true
      return

    if not Apollos.validate.isEmail email
      emailTemplate = template.email.get()
      emailTemplate.methods.setStatus true
      return

    if not password
      passwordTemplate = template.password.get()
      passwordTemplate.methods.setStatus "Password cannot be empty", true
      return

    if not terms
      termsTemplate = template.terms.get()
      termsTemplate.methods.setStatus "You must accept the terms and conditions", true
      return

    Apollos.user.getAccountType email, (error, accountType) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"

      types = Apollos.enums.accountType

      switch accountType
        when types.apollos, types.f1, types.ldap
          template._.login email, password
          template.hasAccount.set true
        else
          template._.createAccount email, password

  "click [data-forgot-password]": (event, template) ->

    if event.target.dataset?.forgotPassword
      templateLink = template.data.bind.get()

      email = template.email.get()
      email = email.methods.getValue()

      templateLink.parent.email.set email
      templateLink.parent.passwordForget.set true


#
#
# loginWithLDAP = (email, password, template) ->
#
#   Apollos.user.login.ldap email, password, (error, success) ->
#
#     if error
#       # Uh oh... what do we do here?
#       debug "ERROR: #{error}"
#       _passwordError template
#
#     if success is `undefined`
#       debug "this wasnt an ldap account?"
#       return
#
#     if success
#       # need to bypass user login to use Accounts.validateLogin
#       debug "you should be logged in from here"
#       return
#
#     _passwordError(template)
#
#
#
