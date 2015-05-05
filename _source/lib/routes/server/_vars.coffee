
Apollos.api or= {}
Apollos.api.base = "api/v1"
Apollos.api.allEndpoints = []

Apollos.api.endpoints =
  user:
    url: "users/"
  person:
    url: "people/"
  # transaction: "#{baseURL}transactions/"
  # transactionDetail: "#{baseURL}transactionDetails/"
  # account: "#{baseURL}accounts/"

Apollos.api.tokenName = Meteor.settings.api.tokenName
Apollos.api.token = Meteor.settings.api.token


if not Apollos.api.tokenName or not Apollos.api.token
  return



Apollos.api.register = (collections, platform) ->

  if not _.isArray(collections) and collections isnt "all"
    Apollos.debug "You must specify an array of collections to register, or the keyword all to register all endpoints"
    return


  if collections is "all"
    Apollos.api.allEndpoints = _.union(Apollos.api.allEndpoints, [platform])
    return

  for collection in collections
    if not Apollos.api.endpoints[collection]
      Apollos.debug "no endpoint set for #{collection}"
      continue

    Apollos.api.endpoints[collection].platforms or= []


    Apollos.api.endpoints[collection].platforms = _.union(
      Apollos.api.endpoints[collection].platforms,
      [platform]
    )

  return


# Apollos.api.register("all", {platform: "FOO", url: "localhost:3000"})
#
# Apollos.api.register(["person"], {platform: "FOO", url: "localhost:3000"})
# Apollos.api.register(["person"], {platform: "FOOBAR", url: "localhost:4000"})
