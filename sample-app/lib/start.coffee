# if Meteor.isServer and not process.env.IS_MIRROR
  # Cluster.connect("mongodb://localhost/discovery")
  # Cluster.register("web")

if Meteor.isCordova

  Meteor.startup ->

    document.addEventListener 'deviceready', (->
      window.Lookback.setupWithAppToken 'rs3HMt78YRHBKLqMQ'
      window.Lookback.shakeToRecord true
      return
    ), false
    return
