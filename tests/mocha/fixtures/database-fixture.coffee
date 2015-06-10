### globals
   resetDatabase: true,
   loadDefaultFixtures: true,
###
if not (Meteor.isServer and process.env.IS_MIRROR)
  return

resetDatabase = (callback) ->
  console.log 'Resetting database'
  # safety check
  if !process.env.IS_MIRROR
    console.error 'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    return false

  collectionsRemoved = 0
  db = Meteor.users.find()._mongo.db
  db.collections (err, collections) ->
    appCollections = _.reject(collections, (col) ->
      col.collectionName.indexOf('velocity') == 0 or col.collectionName == 'system.indexes'
    )
    _.each appCollections, (appCollection) ->
      appCollection.remove (e) ->
        if e
          console.error 'Failed removing collection', e
          callback()
        collectionsRemoved++
        console.log 'Removed collection'
        if appCollections.length == collectionsRemoved
          console.log 'Finished resetting database'
          callback()
        return
      return
    return

loadDefaultFixtures = ->
  console.log 'Loading default fixtures'
  console.log 'Finished loading default fixtures'
  return


resetDatabase ->
  loadDefaultFixtures()
