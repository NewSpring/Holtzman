
Apollos.translate = (collection, platform, handler) ->

  if not Apollos[collection]
    Apollos.debug "Cannot set translate method for #{collection} becuase it doesn't exist"
    return

  if not platform
    Apollos.debug "Must specify platform"
    return

  platform = platform.toUpperCase()
  Apollos[collection]._dictionary or= {}

  if Apollos[collection]._dictionary[platform]
    Apollos.debug "The translation for #{collection} from #{platform} has already been set"
    return

  Apollos[collection]._dictionary[platform] = handler

  return
