class ForgotPassword

  constructor: (template) ->

    @.template = template


Template.forgotPassword.onCreated ->

  self = @

  # self.subscribe "apollos-users"
  self._ = new ForgotPassword self

  self.email = new ReactiveVar()

  if self.data?.bind
    parentLink = self.data.bind.get()
    parentLink.methods = self._
    self.data.bind.set parentLink

    if parentLink.parent.email
      self.email = parentLink.parent.email.get()

  self.reset = new ReactiveVar(false)
  self.hasErrors = new ReactiveVar(false)

  self.email = new ReactiveVar({
    methods: null
    parent: self
  })


Template.forgotPassword.helpers

  "hasErrors": ->
    return Template.instance().hasErrors.get()


  "email": ->
    return Template.instance().email

  "sentEmail": ->

    emailTemplate = Template.instance().email.get()

    if emailTemplate?.methods
      email = emailTemplate.methods.getValue()

      return email

    return


  "reset": ->
    return Template.instance().reset.get()



Template.forgotPassword.events

  "click [data-forgot-password]": (event, template) ->

    if event.target.dataset?.forgotPassword
      templateLink = template.data.bind.get()

      email = template.email.get()
      if email?.methods
        email = email.methods.getValue()

        templateLink.parent.email.set email

      templateLink.parent.passwordForget.set false



  "submit #forgot-password": (event, template) ->
    event.preventDefault()

    email = template.find("input[name=email]").value.toLowerCase()

    if not Apollos.validate.isEmail email
      template.hasErrors.set true
      emailTemplate = template.email.get()
      emailTemplate.methods.setStatus true
      return


    Apollos.user.forgotPassword email
    template.reset.set true
    return


Template.forgotPassword.onRendered ->

  self = @

  templateLink = @.data.bind.get()
  if email
    email = templateLink.parent.email.get()

  if emailTemplate
    emailTemplate = self.email.get()
    emailTemplate.methods.setValue email
