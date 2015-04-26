sync = (entityType, msTime) ->
  Meteor.setTimeout ->
    debug "\n*** STARTING ROCK SYNC: #{entityType} ***\n"
    Rock[entityType].refresh true
  , msTime


syncAllWhenRockIsReady = ->

  if not Rock.isAlive()
    debug "Waiting to sync because Rock is not responding"
    Meteor.setTimeout syncAllWhenRockIsReady, 15000
    return

  entities = [
    "definedValues"
    "users"
    "people"
    "transactions"
    "transactionDetails"
    "accounts"
  ]

  msTime = 0
  msSpacing = 1000

  for entity in entities
    sync entity, msTime
    msTime += msSpacing


Meteor.startup ->
  if not process.env.IS_MIRROR
    serverWatch.refresh Rock.name, syncAllWhenRockIsReady
