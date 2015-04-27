class forgotPassword extends Apollos.Component

  @register "forgotPassword"

  template: "forgotPassword"


  vars: -> [

    hasErrors: false
    sentEmail: ""
    reset: false

  ]

  events: -> [

    "click [data-forgot-password]": (event) ->

      self = @
      parent = @.parent()

      parent.passwordForget.set false



    "submit #forgot-password": (event) ->

      event.preventDefault()
      self = @
      children = {}
      for child in self.children("input")
        children[child.data().name] = child

      email = self.find("input[name=email]").value.toLowerCase()

      if not Apollos.validate.isEmail email
        children["email"].setStatus true
        return

      self.parent().email.set email


      Apollos.user.forgotPassword email
      self.reset.set true
      return


  ]
