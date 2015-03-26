if Meteor.isCordova

  Meteor.startup ->
    
    document.addEventListener 'deviceready', (->
      window.Lookback.setupWithAppToken 'rs3HMt78YRHBKLqMQ'
      window.Lookback.shakeToRecord true
      return
    ), false
    return
