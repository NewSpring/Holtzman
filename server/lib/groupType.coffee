Apollos.groupType = {}


###

  Apollos.groupType.translate

  @example take data from a service and format it for Apollos

    Apollos.groupType.translate([obj, platform])

  @param groupType [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.groupType.translate = (groupType, platform) ->
  return Apollos.documentHelpers.translate "groupType", groupType, platform


###

  Apollos.groupType.update

  @example update a groupType in apollos with data from another service

    Apollos.groupType.update([obj, platform])

  @param groupType [Object] existing groupType from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.groupType.update = (groupType, platform) ->
  return Apollos.documentHelpers.update "groupType", "groupTypes", groupType, platform


###

  Apollos.groupType.delete

  @example take a groupType and delete it

    Apollos.groupType.delete(user, [platform])

  @param groupType [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.groupType.delete = (groupType, platform) ->
  Apollos.documentHelpers.delete "groupType", "groupTypes", groupType, platform
