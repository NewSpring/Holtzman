Apollos.group = {}

###

  Apollos.group.translate

  @example take data from a service and format it for Apollos

    Apollos.group.translate([obj, platform])

  @param group [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.group.translate = (group, platform) ->
  return Apollos.documentHelpers.translate "group", group, platform


###

  Apollos.group.update

  @example update a group in apollos with data from another service

    Apollos.group.update([obj, platform])

  @param group [Object] existing group from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.group.update = (group, platform) ->
  return Apollos.documentHelpers.update "group", "groups", group, platform


###

  Apollos.group.delete

  @example take a group and delete it

    Apollos.group.delete(user, [platform])

  @param group [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.group.delete = (group, platform) ->
  Apollos.documentHelpers.delete "group", "groups", group, platform
