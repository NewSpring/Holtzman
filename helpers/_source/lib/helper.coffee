


###

  Apollos.helpers

###
Apollos.helpers = {}


Apollos.helpers._addHelper = (name, handler) ->

  if Apollos.helpers[name]
    throw new Apollos.Error("Helper function #{name} is already registered")
    return

  if not handler and (typeof helper isnt "function" or typeof helper isnt "object")
    throw new Apollos.Error("Helper: #{name} requires a function or object")
    return

  Apollos.helpers[name] = handler

  if Meteor.isClient
    Template.registerHelper name, handler

  return
