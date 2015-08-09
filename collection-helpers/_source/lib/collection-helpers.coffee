Apollos.documentHelpers =


  translate: (singular, data, platform) ->

    if not platform
      Apollos.debug "must specify platform to translate to"
      return

    platform = platform.toUpperCase()

    if not Apollos[singular]._dictionary[platform]
      Apollos.debug "no translation found for #{platform} in #{singular}"
      return

    # translate
    return Apollos[singular]._dictionary[platform] data


  ###

    Apollos.documentHelpers.update

    @example update a doc in apollos with data from a platform

      Apollos.documentHelpers.update "person", "people", person, platform

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param doc [Object] existing doc from other service to be updated
    @param platform [String] platform to be updated from

  ###
  update: (singular, plural, doc, platform) ->

    doc = Apollos[singular].translate doc, platform

    if not doc
      return

    singularIdKeyValue = {}
    singularIdKeyValue["#{singular}Id"] = doc["#{singular}Id"]

    if platform
      doc.updatedBy = platform.toUpperCase()
    else
      doc.updatedBy = Apollos.name

    query =
      $or: [
        singularIdKeyValue
      ,
        guid: RegExp(doc.guid, "i")
      ]

    matches = Apollos[plural].find query,
      sort:
        updatedDate: 1

    if matches.count() > 1
      # Delete older documents, which are the first ones since they are sorted
      ids = matches.map (m) ->
        return m._id

      ids.pop()

      Apollos[plural].remove({
        _id:
          $in: ids
      }, (err) ->
        if err
          throw new Meteor.Error err
      )

      matches = Apollos[plural].find(query)

    if matches.count() is 1
      existing = matches.fetch()[0]
      mongoId = existing._id

      Apollos[plural].update(mongoId,
      {
        $set: doc
      }, (err) ->
        if err
          throw new Meteor.Error err
      )

    else

      # do we need to return this directly? Can we async this?
      Apollos[plural].insert(doc, (err) ->
        if err
          throw new Meteor.Error err
      )



  ###

    Apollos.documentHelpers.delete

    @example take an colection and delete it

      Apollos.documentHelpers.delete("person", "people", 3, plaform)

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param identifier [Object|String|Number] existing document, _id
    @param platform [String] platform initiating the delete

  ###
  delete: (singular, plural, identifier, platform) ->

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

    # We have to update this first so the collection hooks know what to do
    Apollos[plural].update(doc._id, {
      $set:
        "updatedBy": doc.updatedBy
    }, (err, count) ->
      if err
        throw new Meteor.Error err
    )

    Apollos[plural].remove(doc._id, (err, count) ->
      if err
        throw new Meteor.Error err
    )
