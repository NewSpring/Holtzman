

###

  Apollos.utilities

###
Apollos.utilities = {}


Apollos.utilities._addUtil = (name, handler) ->

  if Apollos.utilities[name]
    throw new Apollos.Error("Utility function #{name} is already registered")
    return

  if not handler or typeof handler isnt "function"
    throw new Apollos.Error("Utility: #{name} requires a function")
    return

  Apollos.utilities[name] = handler

  return



###

  base64Encode

  @param platform [String] string to be encoded

###
base64Encode = (theString) ->
  return new Buffer(theString).toString "base64"

Apollos.utilities._addUtil("base64Encode", base64Encode)



###

  makeNewGuid

###
makeNewGuid = ->
  s4 = ->
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)

  guid = "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
  return guid.toUpperCase()


Apollos.utilities._addUtil("makeNewGuid", makeNewGuid)
