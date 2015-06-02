class profile.forgotPassword extends Apollos.Component

  @register "profile.forgotPassword"
  @card "Apollos.profile.onBoard"
  url: "forgot-password"


  vars: -> [

    hasErrors: false
    sentEmail: ""
    reset: false

  ]


  email: -> @.parent()?.email

  events: -> [


    "submit #forgot-password": (event) ->

      event.preventDefault()
      self = @
      children = {}
      for child in self.children("Apollos.forms.input")
        children[child.data().name] = child

      email = self.find("input[name=email]").value.toLowerCase()

      if not Apollos.validate.isEmail email
        children["email"].setStatus true
        return

      if email
        self.parent().email.set email

      Apollos.user.forgotPassword email
      self.reset.set true
      return


  ]
