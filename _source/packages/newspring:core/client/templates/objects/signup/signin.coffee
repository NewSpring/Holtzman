
Template.signin.onCreated ->

  self = @

  self.subscribe "apollos-users"

  self.hasAccount = new ReactiveVar(true)
  self.hasErrors = new ReactiveVar(false)

  self.password = new ReactiveVar({})
  self.email = new ReactiveVar({})


Template.signin.helpers

  "hasAccount": ->
    return Template.instance().hasAccount.get()

  "hasErrors": ->
    return Template.instance().hasErrors.get()

  "password": ->
    return Template.instance().password.get()

  "email": ->
    return Template.instance().email.get()

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
  template.hasErrors.set = true

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

    if t.hasErrors.get()
      t.hasErrors.set false

    $(e.target.parentNode).addClass("input--active")


  "blur input": (e, t) ->

    if t.hasErrors.get()
      t.hasErrors.set false

    if not e.target.value

      $(e.target.parentNode).removeClass("input--active")


  "focus input[name=email], keyup input[name=email], blur input[name=email]": (e, t) ->
    _refreshVariable(t.email, e.target.value)


  "focus input[name=password], keyup input[name=password], blur input[name=password]": (e, t) ->
    _refreshVariable(t.password, e.target.value)


  "blur input[name=email]": (e, t) ->

    _input = e.target

    if not _input.value
      t.hasAccount.set true
      return

    if not Apollos.validate.isEmail _input.value
      _emailError(t)
      return

    email = Apollos.users.findOne({
      "emails.address": _input.value
    })

    if email
      t.hasAccount.set true
    else
      t.hasAccount.set false



  "submit #signin": (e, t) ->
    e.preventDefault()

    email = t.find("input[name=email]").value
    password = t.find("input[name=password]").value

    if not Apollos.validate.isEmail email
      _emailError(t)
      return

    Meteor.loginWithPassword email, password, (err) ->
      if not err
        return

      # wrong password
      if err.error is 403
        _passwordError(t)

      # no email
      if err.error is 400
        _emailError(t)


  "submit #signup": (e, t) ->
    e.preventDefault()

    email = t.find("input[name=email]").value
    password = t.find("input[name=password]").value
    terms = t.find("input[name=terms]").checked

    if terms == false
      _termsError(t)
      return

    Apollos.user.create(email, password, (err) ->
      if not err
        return

      _passwordError(t)
    )
