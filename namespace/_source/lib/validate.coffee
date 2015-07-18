

###

  Apollos.validate

###
Apollos.validate = {}


Apollos.validate._addValidateFunc = (name, handler) ->

  if Apollos.validate[name]
    throw new Apollos.Error("Validation function #{name} is already registered")
    return

  if not handler or typeof handler isnt "function"
    throw new Apollos.Error("Validation: #{name} requires a function")
    return

  Apollos.validate[name] = handler

  return
