Template.signin.onCreated ->

  self = @

  self.subscribe "apollos-users"

  self.hasAccount = new ReactiveVar(true)
  self.hasErrors = new ReactiveVar(false)

  self.password = new ReactiveVar({})
  self.email = new ReactiveVar({})
  self.terms = new ReactiveVar({})


Template.signin.helpers

  "hasAccount": ->
    return Template.instance().hasAccount.get()

  "hasErrors": ->
    return Template.instance().hasErrors.get()

  "password": ->
    return Template.instance().password.get()

  "email": ->
    return Template.instance().email.get()

  "terms": ->
    return Template.instance().terms.get()


###
  put email field in error state
###
_emailError = (template) ->
  _email = template.email.get()
  _email.status = "Please enter a valid email"
  template.email.set _email
  template.hasErrors.set true

###
  put password field in error state
###
_passwordError = (template) ->
  _password = template.password.get()
  if _password.value is ''
    _password.status = "Password may not be empty"
  else
    _password.status = "Password incorrect"
  template.password.set _password
  template.hasErrors.set true

###
  put terms in error state
###
_termsError = (template) ->
  _terms = template.terms.get()
  _terms.status = "You must accept the terms and conditions"
  template.terms.set _terms
  template.hasErrors.set true

###
  reset errors
###
_resetErrors = (template) ->
  if template.hasErrors.get()
    template.hasErrors.set false

###
  keep reactive vars in sync
###
_refreshVariable = (variable, value) ->
  _var = variable.get()
  _var.value = value
  _var.status = false
  variable.set _var


Template.signin.events


  "focus input": (e, t) ->

    _resetErrors(t)

    $(e.target.parentNode).addClass("input--active")


  "blur input": (e, t) ->

    _resetErrors(t)

    if not e.target.value

      $(e.target.parentNode).removeClass("input--active")


  "focus input[name=email], keyup input[name=email], blur input[name=email]": (e, t) ->
    _refreshVariable(t.email, e.target.value)

  "focus input[name=password], keyup input[name=password], blur input[name=password]": (e, t) ->
    _refreshVariable(t.password, e.target.value)

  "click input[name=terms]": (e, t) ->
    _refreshVariable(t.terms, e.target.value)
    _resetErrors(t)


  "blur input[name=email]": (e, t) ->

    _input = e.target
    email = _input.value

    if not email
      t.hasAccount.set true
      return

    if not Apollos.validate.isEmail email
      _emailError(t)
      return

    Apollos.getAccountType email, (error, accountType) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"

      types = Apollos.enums.accountType

      switch accountType
        when types.apollos then t.hasAccount.set true
        when types.f1 then t.hasAccount.set true
        else t.hasAccount.set false


  "submit #signin": (event, template) ->
    event.preventDefault()

    email = template.find("input[name=email]").value
    password = template.find("input[name=password]").value

    if not Apollos.validate.isEmail email
      _emailError template
      return

    Apollos.getAccountType email, (error, accountType) ->
      if error
        # Uh oh... what do we do here?
        debug "ERROR: #{error}"

      types = Apollos.enums.accountType

      switch accountType
        when types.apollos then loginToApollos email, password, template
        when types.f1 then createAccountFromF1 email, password, template
        else template.hasAccount.set false


  "submit #signup": (event, template) ->
    event.preventDefault()

    email = template.find("input[name=email]").value
    password = template.find("input[name=password]").value
    terms = template.find("input[name=terms]").checked

    if not Apollos.validate.isEmail email
      _emailError template
      return

    if password.length is 0
      _passwordError template

    if not terms
      _termsError template
      return

    createApollosAccount email, password, template


createAccountFromF1 = (email, password, template) ->
  Apollos.checkF1Credentials email, password, (error, success) ->
    if error
      # Uh oh... what do we do here?
      debug "ERROR: #{error}"
      _passwordError template

    else if success
      createApollosAccount email, password, template

    else
      _passwordError template


createApollosAccount = (email, password, template) ->
  Apollos.user.create email, password, (error) ->
    if error
      _passwordError template


loginToApollos = (email, password, template) ->
  Meteor.loginWithPassword email, password, (err) ->
    if not err
      return

    # wrong password
    if err.error is 403
      _passwordError template

    # no email
    if err.error is 400
      _emailError template
