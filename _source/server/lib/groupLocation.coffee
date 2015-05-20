Apollos.groupLocation = {}

Apollos.groupLocation.translate = (groupLocation, platform) ->
  return Apollos.documentHelpers.translate "groupLocation", groupLocation, platform

Apollos.groupLocation.update = (groupLocation, platform) ->
  return Apollos.documentHelpers.update "groupLocation", "groupLocations", groupLocation, platform

Apollos.groupLocation.delete = (groupLocation, platform) ->
  Apollos.documentHelpers.delete "groupLocation", "groupLocations", groupLocation, platform
