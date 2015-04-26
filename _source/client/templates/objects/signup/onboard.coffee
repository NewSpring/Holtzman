class OnBoard

  constructor: (template) ->

    @.template = template


Template.onboard.onCreated ->

  self = @

  self._ = new OnBoard self


  self.passwordForget = new ReactiveVar(false)
  self.email = new ReactiveVar()

  self.signin = new ReactiveVar({
    methods: null
    parent: self
  })

  self.forgotPassword = new ReactiveVar({
    methods: null
    parent: self
  })



Template.onboard.helpers

  # states
  "passwordForget": ->
    return Template.instance().passwordForget.get()

  "resetPasswordToken": ->
    return Session.get "resetPasswordToken"

  # children templates
  "signinLink": ->
    return Template.instance().signin

  "passwordForgetLink": ->
    return Template.instance().forgotPassword
