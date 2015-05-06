Apollos.regex =

  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  bcrypt: /^\$2a\$10\$[\/\.a-zA-Z0-9]{53}$/

  phoneNumber: /^[1-9]([0-9]{6}|[0-9]{9})$/

  guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i


Apollos.addRegex = (obj) ->

  for key, value of obj
    Apollos.regex[key] = value

  return


Apollos.validate =

  isEmail: (str) ->

    Apollos.regex.email.test str

  isBcryptHash: (str) ->

    Apollos.regex.bcrypt.test str

  isGuid: (str) ->

    Apollos.regex.guid.test str

  isPhoneNumber: (str) ->

    Apollos.regex.phoneNumber.test str
