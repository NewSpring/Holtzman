

Apollos.translate = (doc, platform, handler) ->

  if not Apollos[doc]
    debug "Cannot set translate method for #{doc} becuase it doesn't exist"
    return

  if not platform
    debug "Must specify platform"
    return


  Apollos[doc]._dictionary or= {}

  if Apollos[doc]._dictionary[platform]
    debug "The translation for #{doc} from #{platform} has already been set"
    return

  Apollos[doc]._dictionary[platform] = handler
  
  return
