### globals
   resetDatabase: true,
   loadDefaultFixtures: true,
###

Future = Npm.require('fibers/future')

resetDatabase = ->
  console.log 'Resetting database'
  # safety check
  if !process.env.IS_MIRROR
    console.error 'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    return false
  fut = new Future
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
          fut.return 'fail: ' + e
        collectionsRemoved++
        console.log 'Removed collection'
        if appCollections.length == collectionsRemoved
          console.log 'Finished resetting database'
          fut['return'] 'success'
        return
      return
    return
  fut.wait()

loadDefaultFixtures = ->
  console.log 'Loading default fixtures'
  # TODO: Insert your data into the database here
  console.log 'Finished loading default fixtures'
  return

if process.env.IS_MIRROR
  resetDatabase()
  loadDefaultFixtures()
