Apollos.groupLocation = {}

###

  Apollos.groupLocation.translate

  @example take data from a service and format it for Apollos

    Apollos.groupLocation.translate([obj, platform])

  @param groupLocation [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.groupLocation.translate = (groupLocation, platform) ->
  return Apollos.documentHelpers.translate "groupLocation", groupLocation, platform


###

  Apollos.groupLocation.update

  @example update a groupLocation in apollos with data from another service

    Apollos.groupLocation.update([obj, platform])

  @param groupLocation [Object] existing groupLocation from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.groupLocation.update = (groupLocation, platform) ->
  return Apollos.documentHelpers.update "groupLocation", "groupLocations", groupLocation, platform


###

  Apollos.groupLocation.delete

  @example take a groupLocation and delete it

    Apollos.groupLocation.delete(user, [platform])

  @param groupLocation [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.groupLocation.delete = (groupLocation, platform) ->
  Apollos.documentHelpers.delete "groupLocation", "groupLocations", groupLocation, platform
