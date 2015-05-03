
Apollos.api or= {}

Apollos.api.register = (collections, platform) ->

  if not _.isArray collections or collections isnt "all"
    Apollos.debug "You must specify an array of collections to register, or the keyword all to register all endpoints"
    return

  
