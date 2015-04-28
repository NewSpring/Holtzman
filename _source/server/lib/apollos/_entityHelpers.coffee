Apollos.entityHelpers =


  translate: (doc, data, platform) ->

    if not platform
      debug "must specify platform to translate to"

    if not Apollos[doc]._dictionary[platform]
      debug "no translation found for #{platform} in #{doc}"
      return

    # translate
    return Apollos[doc]._dictionary[platform] data


  ###

    Apollos.entityHelpers.update

    @example update an entity in apollos with data from a platform

      Apollos.entityHelpers.update "person", "people", person, platform

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param entity [Object] existing entity from other service to be updated
    @param platform [String] platform to be updated from

  ###
  update: (singular, plural, entity, platform) ->

    entity = Apollos[singular].translate entity, platform
    singularIdKeyValue = {}
    singularIdKeyValue["#{singular}Id"] = entity["#{singular}Id"]

    if platform
      entity.updatedBy = platform.toUpperCase()
    else
      entity.updatedBy = Apollos.name

    query =
      $or: [
        singularIdKeyValue
      ,
        guid: RegExp(entity.guid, "i")
      ]

    matches = Apollos[plural].find query,
      sort:
        updatedDate: 1

    if matches.count() > 1
      # Delete older documents, which are the first ones since they are sorted
      ids = matches.map (m) ->
        return m._id

      ids.pop()

      Apollos[plural].remove
        _id:
          $in: ids

      matches = Apollos[plural].find(query)

    if matches.count() is 1
      existing = matches.fetch()[0]
      mongoId = existing._id

      Apollos[plural].update
        _id: mongoId
      ,
        $set: entity

    else
      mongoId = Apollos[plural].insert entity

    return mongoId


  ###

    Apollos.entityHelpers.delete

    @example take an entity and delete it

      Apollos.entityHelpers.delete("person", "people", 3, plaform)

    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param identifier [Object|String|Number] existing document, _id
    @param platform [String] platform initiating the delete

  ###
  delete: (singular, plural, identifier, platform) ->

    if typeof identifier is "number"
      singularIdKeyValue = {}
      singularIdKeyValue["#{singular}Id"] = identifier
      entity = Apollos[plural].findOne singularIdKeyValue

    else if typeof identifier is "string"
      entity = Apollos[plural].findOne identifier

    else
      entity = identifier

    if typeof entity isnt "object"
      throw new Meteor.Error "Delete Error", "Could not delete #{singular}
        identified by #{identifier}"

    if platform
      entity.updatedBy = platform.toUpperCase()
    else
      entity.updatedBy = Apollos.name

    # We have to update this first so the collection hooks know what to do
    Apollos[plural].update
      _id: entity._id
    ,
      $set:
        "updatedBy": entity.updatedBy

    Apollos[plural].remove entity._id
