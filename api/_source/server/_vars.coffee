
Apollos.api or= {}
Apollos.api.base = "api/v1"
Apollos.api.endpoints = {}
Apollos.api.platforms = []

if not (Meteor.settings.api?.tokenName and Meteor.settings.api?.token)
  return

Apollos.api.tokenName = Meteor.settings.api.tokenName
Apollos.api.token = Meteor.settings.api.token
