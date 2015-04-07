
Template.signin.onCreated ->

  self = @

  self.subscribe "apollos-users"

  # need to get rid of session use here
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


Template.signin.events


  "focus input": (e, t) ->
    template = Template.instance()

    # if e.target.value
    #   validEmail = Apollos.validate.isEmail template.email.value

    if template.hasErrors.get()
      template.hasErrors.set false

    $(e.target.parentNode).addClass("input--active")


  "blur input": (e, t) ->

    template = Template.instance()
    if template.hasErrors.get()
      template.hasErrors.set false

    if not e.target.value

      $(e.target.parentNode).removeClass("input--active")



  "keyup input[name=email]": (e, t) ->
    if not e.target.value
      return

    email = Apollos.users.findOne({
      "emails.address": e.target.value
    })

    if email
      Session.set "hasAccount", true


  "focus input[name=email], keyup input[name=email], blur input[name=email]": (e, t) ->


    template = Template.instance()

    _email = template.email.get()
    _email.value = e.target.value

    _email.status = false

    template.email.set _email


  "focus input[name=password], keyup input[name=password], blur input[name=password]": (e, t) ->


    template = Template.instance()

    _password = template.password.get()
    _password.value = e.target.value

    _password.status = false

    template.password.set _password



  "blur input[name=email]": (e, t) ->

    template = Template.instance()

    _input = e.target

    if not _input.value
      template.hasAccount.set true
      return

    if not Apollos.validate.isEmail _input.value
      _email = template.email.get()
      _email.status = "Please enter a valid email"
      template.email.set _email
      template.hasErrors.set true
      return


    email = Apollos.users.findOne({
      "emails.address": _input.value
    })

    if email
      template.hasAccount.set true
    else
      template.hasAccount.set false


  "submit #signin": (e, t) ->
    e.preventDefault()

    template = Template.instance()

    email = template.find("input[name=email]").value
    password = template.find("input[name=password]").value

    if not Apollos.validate.isEmail email
      _email = template.email.get()
      _email.status = "Please enter a valid email"
      template.email.set _email
      template.hasErrors.set true
      return

    Meteor.loginWithPassword email, password, (e) ->
      if not e
        return

      template.hasErrors.set true
      # wrong password
      if e.error is 403
        _password = template.password.get()
        _password.status = "Incorrect Password"
        template.password.set _password

      # no email
      if e.error is 400
        _email = template.email.get()
        _email.status = "Please include your email address"
        template.password.set _email


  "submit #signup": (e, t) ->
    e.preventDefault()

    template = Template.instance()

    email = template.find("input[name=email]").value
    password = template.find("input[name=password]").value
    terms = template.find("input[name=terms]").value

    Apollos.user.create(email, password, (error) ->

      if not error
        return

      template.hasErrors.set true

      console.log e

    )
