Apollos.validate =

  isEmail: (str) ->

    Apollos.regex.email.test str

  isBcryptHash: (str) ->

    Apollos.regex.bcrypt.test str
