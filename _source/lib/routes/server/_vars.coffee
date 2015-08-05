
Apollos.api or= {}
Apollos.api.base = "api/v1"
Apollos.api.endpoints = {}
Apollos.api.platforms = {}

if not Meteor.settings.api?.tokenName
  Apollos.debug "No token name is defined in the settings!"
  return

Apollos.api.tokenName = Meteor.settings.api.tokenName
