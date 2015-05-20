Apollos.location = {}

Apollos.location.translate = (location, platform) ->
  return Apollos.documentHelpers.translate "location", location, platform

Apollos.location.update = (location, platform) ->
  return Apollos.documentHelpers.update "location", "locations", location, platform

Apollos.location.delete = (location, platform) ->
  Apollos.documentHelpers.delete "location", "locations", location, platform
