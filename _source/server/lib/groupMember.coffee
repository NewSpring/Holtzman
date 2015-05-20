Apollos.groupMember = {}

Apollos.groupMember.translate = (groupMember, platform) ->
  return Apollos.documentHelpers.translate "groupMember", groupMember, platform

Apollos.groupMember.update = (groupMember, platform) ->
  return Apollos.documentHelpers.update "groupMember", "groupMembers", groupMember, platform

Apollos.groupMember.delete = (groupMember, platform) ->
  Apollos.documentHelpers.delete "groupMember", "groupMembers", groupMember, platform
