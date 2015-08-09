changeWasAlreadyHandled = (doc, collection) ->

  if not doc.observationHash
    return false

  hash = hashObject doc

  if doc.observationHash is hash
    return true

  Apollos[collection].update doc._id, $set: observationHash: hash
  doc.observationHash = hash
  return false

hashObject = (obj) ->

  json = JSON.stringify obj
  hash = 0
  i = 0
  len = json.length

  if len is 0
    return hash

  while i < len
    chr = json.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0
    i++

  return hash

Apollos.observe = (collection) ->

  initializing = true

  Apollos[collection].find({},
    fields:
      observationHash: 0
      createdDate: 0
      updatedDate: 0
      updatedBy: 0
  ).observe

    added: (newDoc) ->

      id = newDoc._id

      if initializing
        return

      doc = Apollos[collection].findOne id
      if changeWasAlreadyHandled doc, collection
        Apollos.debug "#{collection} #{id} add already handled"
        return

      Apollos.debug "Handling add in #{collection} #{id}"
      Apollos[collection].added or= {}
      platformAddedBy = doc.updatedBy?.toUpperCase()

      for platform, handle of Apollos[collection].added
        if platformAddedBy isnt platform.toUpperCase()
          handle doc

    changed: (newDoc, oldDoc) ->

      id = newDoc._id
      doc = Apollos[collection].findOne id
      if changeWasAlreadyHandled doc, collection
        Apollos.debug "#{collection} #{id} change already handled"
        return

      Apollos.debug "Handling change in #{collection} #{id}"
      Apollos[collection].changed or= {}
      platformChangedBy = doc.updatedBy?.toUpperCase()

      for platform, handle of Apollos[collection].changed
        if platformChangedBy isnt platform.toUpperCase()
          handle doc, oldDoc

    removed: (oldDoc) ->

      Apollos[collection].deleted or= {}

      for platform, handle of Apollos[collection].deleted
        handle oldDoc


  initializing = false



Apollos.observe.remove = (doc, platform, methods) ->

  if not Apollos[doc]
    Apollos.debug(
      "Cannot remove observe methods for #{doc} becuase it doesn't exist"
    )
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
    Apollos.debug(
      "Cannot set observe methods for #{doc} becuase it doesn't exist"
    )
    return

  if not platform
    Apollos.debug "Must specify platform"
    return


  for method, handle of methods

    Apollos[doc][method] or= {}

    if Apollos[doc][method][platform]
      Apollos.debug(
        "The #{method} observe handler for #{doc} from
        #{platform} has already been set"
      )
      return
    Apollos[doc][method][platform] = handle


  return
