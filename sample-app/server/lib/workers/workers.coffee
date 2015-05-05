Meteor.startup ->
  if process.env.IS_MIRROR
    return

  # normanConn = Cluster.discoverConnection("norman")
  #
  # query = Apollos.queuedApiRequests.find(requestSent: false)
  #
  # # Does this pass alives status so we don't have to call .isAlive()?
  # Rock.isAlive.onChange ->
  #
  #   if not Rock.isAlive()
  #     return
  #
  #   query.observe
  #     added: (request) ->
  #       console.log 'processing', request._id
  #       normanConn.call "processRockApiRequest", request
