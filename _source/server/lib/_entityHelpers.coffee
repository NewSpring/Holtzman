Apollos.documentHelpers =


  translate: (singular, data, platform, subName) ->

    if not platform
      Apollos.debug "must specify platform to translate to"
      return

    platform = platform.toUpperCase()

    if not Apollos[singular]._dictionary[platform]
      Apollos.debug "no translation found for #{platform} in #{singular}"
      return

    # translate
    return Apollos[singular]._dictionary[platform] data, subName

  ###

    Apollos.documentHelpers.update

    @example update a doc in apollos with data from a platform

      Apollos.documentHelpers.update "person", "people", person, platform

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param doc [Object] existing doc from other service to be updated
    @param platform [String] platform to be updated from

  ###
  update: (singular, plural, doc, platform, subName) ->

    doc = Apollos[singular].translate doc, platform, subName

    if not doc
      return

    singularIdKeyValue = {}
    singularId = doc["#{singular}Id"]
    singularIdKeyValue["#{singular}Id"] = singularId

    if platform
      doc.updatedBy = platform.toUpperCase()
    else
      doc.updatedBy = Apollos.name

    orArray = []

    if singularId
      orArray.push singularIdKeyValue

    if doc.guid
      orArray.push guid: RegExp(doc.guid, "i")

    if orArray.length
      query = $or: orArray
      matches = Apollos[plural].find query,
        sort:
          updatedDate: 1

      if matches.count() > 1
        # Delete older documents, which are the first ones since they are sorted
        ids = matches.map (m) ->
          return m._id

        ids.pop()
        Apollos.debug "Removing #{ids.length} duplicate(s) from #{plural}",
          query

        # can we make this async?
        Apollos[plural].remove
          _id:
            $in: ids

        matches = Apollos[plural].find(query)

    if matches and matches.count() is 1
      existing = matches.fetch()[0]
      mongoId = existing._id

      # can we make this async?
      Apollos[plural].update
        _id: mongoId
      ,
        $set: doc

    else
      # can we make this async?
      mongoId = Apollos[plural].insert doc

    # what use case do we have where we need the id returned?
    return mongoId


  ###

    Apollos.documentHelpers.delete

    @example take an colection and delete it

      Apollos.documentHelpers.delete("person", "people", 3, plaform)

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param identifier [Object|String|Number] existing document, _id
    @param platform [String] platform initiating the delete

  ###
  delete: (singular, plural, identifier, platform, subName) ->

    if typeof identifier is "number"
      singularIdKeyValue = {}
      singularIdKeyValue["#{singular}Id"] = identifier
      doc = Apollos[plural].findOne singularIdKeyValue

    else if typeof identifier is "string"
      doc = Apollos[plural].findOne identifier

    else
      doc = identifier

    if typeof doc isnt "object"
      throw new Meteor.Error "Delete Error", "Could not delete #{singular}
        identified by #{identifier}"

    if platform
      doc.updatedBy = platform.toUpperCase()
    else
      doc.updatedBy = Apollos.name

    # Can we async this?
    # We have to update this first so the collection hooks know what to do
    Apollos[plural].update
      _id: doc._id
    ,
      $set:
        "updatedBy": doc.updatedBy

    # Can we async this?
    Apollos[plural].remove doc._id
