
Rock.sync = (entityType, msTime) ->
  Meteor.setTimeout ->
    debug "\n*** STARTING ROCK SYNC: #{entityType} ***\n"
    Rock[entityType].refresh true
  , msTime


Rock.sync.entities = [
  "definedValues"
  "users"
  "people"
]


syncAllWhenRockIsReady = ->

  if not Rock.isAlive()
    debug "Waiting to sync because Rock is not responding"
    Meteor.setTimeout syncAllWhenRockIsReady, 15000
    return


  msTime = 0
  msSpacing = 1000

  for entity in Rock.sync.entities
    Rock.sync entity, msTime
    msTime += msSpacing


Meteor.startup ->
  if not process.env.IS_MIRROR
    serverWatch.refresh Rock.name, syncAllWhenRockIsReady
