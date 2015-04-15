sync = (entityType, msTime) ->
  Meteor.setTimeout ->
    debug "\n*** STARTING ROCK SYNC: #{entityType} ***\n"
    Rock[entityType].refresh true
  , msTime


syncAllWhenRockIsReady = ->

  if not Rock.isAlive()
    Meteor.setTimeout syncAllWhenRockIsReady, 1000
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
  Meteor.setTimeout syncAllWhenRockIsReady, 1000
