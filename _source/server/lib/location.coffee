Apollos.location = {}


###

  Apollos.location.translate

  @example take data from a service and format it for Apollos

    Apollos.location.translate([obj, platform])

  @param location [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.location.translate = (location, platform) ->
  return Apollos.documentHelpers.translate "location", location, platform


###

  Apollos.location.update

  @example update a location in apollos with data from another service

    Apollos.location.update([obj, platform])

  @param location [Object] existing location from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.location.update = (location, platform) ->
  return Apollos.documentHelpers.update "location", "locations", location, platform


###

  Apollos.location.delete

  @example take a location and delete it

    Apollos.location.delete(user, [platform])

  @param location [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.location.delete = (location, platform) ->
  Apollos.documentHelpers.delete "location", "locations", location, platform
