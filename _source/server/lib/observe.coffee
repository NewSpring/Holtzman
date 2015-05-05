
Apollos.observe = (collection) ->

  initializing = true

  Apollos[collection].find().observe

    added: (doc) ->

      if initializing
        return

      Apollos[collection].added or= {}

      for platform, handle of Apollos[collection].added
        handle doc


    changed: (newDoc, oldDoc) ->

      Apollos[collection].changed or= {}

      for platform, handle of Apollos[collection].changed
        handle newDoc, oldDoc

    removed: (doc) ->

      Apollos[collection].deleted or= {}

      for platform, handle of Apollos[collection].deleted
        handle doc


  initializing = false



Apollos.observe.remove = (doc, platform, methods) ->

  if not Apollos[doc]
    Apollos.debug "Cannot remove observe methods for #{doc} becuase it doesn't exist"
    return

  if not platform
    Apollos.debug "Must specify platform"
    return

  if not methods
    methods = ["added", "changed", "removed"]

  for method in methods
    delete Apollos[doc][method]


Apollos.observe.add = (doc, platform, methods) ->

  if not Apollos[doc]
    Apollos.debug "Cannot set observe methods for #{doc} becuase it doesn't exist"
    return

  if not platform
    Apollos.debug "Must specify platform"
    return


  for method, handle of methods

    Apollos[doc][method] or= {}

    if Apollos[doc][method][platform]
      Apollos.debug "The #{method} observe handler for #{doc} from #{platform} has already been set"
      return
    Apollos[doc][method][platform] = handle


  return
