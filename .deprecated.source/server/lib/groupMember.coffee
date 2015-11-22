Apollos.groupMember = {}


###

  Apollos.groupMember.translate

  @example take data from a service and format it for Apollos

    Apollos.groupMember.translate([obj, platform])

  @param groupMember [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.groupMember.translate = (groupMember, platform) ->
  return Apollos.documentHelpers.translate "groupMember", groupMember, platform


###

  Apollos.groupMember.update

  @example update a groupMember in apollos with data from another service

    Apollos.groupMember.update([obj, platform])

  @param groupMember [Object] existing groupMember from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.groupMember.update = (groupMember, platform) ->
  return Apollos.documentHelpers.update "groupMember", "groupMembers", groupMember, platform


###

  Apollos.groupMember.delete

  @example take a groupMember and delete it

    Apollos.groupMember.delete(user, [platform])

  @param groupMember [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.groupMember.delete = (groupMember, platform) ->
  Apollos.documentHelpers.delete "groupMember", "groupMembers", groupMember, platform
