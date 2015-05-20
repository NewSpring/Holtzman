Apollos.group = {}

Apollos.group.translate = (group, platform) ->
  return Apollos.documentHelpers.translate "group", group, platform

Apollos.group.update = (group, platform) ->
  return Apollos.documentHelpers.update "group", "groups", group, platform

Apollos.group.delete = (group, platform) ->
  Apollos.documentHelpers.delete "group", "groups", group, platform
