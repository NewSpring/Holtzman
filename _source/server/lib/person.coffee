Apollos.person.alias = {}

###

  Apollos.person.translate

  @example take data from a service and format it for Apollos

    Apollos.person.translate([obj, platform])

  @param person [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.person.translate = (person, platform, subName) ->
  return Apollos.documentHelpers.translate "person", person, platform, subName




###

  Apollos.person.update

  @example update a person in apollos with data from another service

    Apollos.person.update([obj, platform])

  @param person [Object] existing person from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.person.update = (person, platform) ->
  return Apollos.documentHelpers.update "person", "people", person, platform

###

  Apollos.person.alias.update

  @example update a person alias in apollos with data from another service

    Apollos.person.alias.update([obj, platform])

  @param person [Object] existing person from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.person.alias.update = (person, platform) ->
  return Apollos.documentHelpers.update "person", "people", person, platform,
    "alias"

###

  Apollos.person.delete

  @example take a person and delete it

    Apollos.person.delete(user, [platform])

  @param person [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.person.delete = (person, platform) ->
  Apollos.documentHelpers.delete "person", "people", person, platform

###

  Apollos.person.alias.delete

  @example take a person alias and delete it

    Apollos.person.alias.delete(user, [platform])

  @param person [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.person.alias.delete = (person, platform) ->
  Apollos.documentHelpers.delete "person", "people", person, platform, "alias"
