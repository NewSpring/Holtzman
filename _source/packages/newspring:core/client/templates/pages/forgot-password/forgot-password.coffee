Template.forgotPassword.events

  "submit #forgot-password": ->
    email = $("input[name=email]").val()
    if Apollos.validate.isEmail email
      Apollos.user.forgotPassword email
    return false
