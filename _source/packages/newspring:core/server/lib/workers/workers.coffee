Meteor.startup ->
  if not process.env.IS_MIRROR

    normanConn = Cluster.discoverConnection("norman")

    query = Apollos.queuedApiRequests.find(requestSent: false)

    Rock.isAlive.onChange ->
      if Rock.isAlive()
        query.observe
          added: (request) ->
            console.log 'processing', request._id
            normanConn.call "processRockApiRequest", request

