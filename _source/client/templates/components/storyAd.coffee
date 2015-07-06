class Apollos.storyAd extends Apollos.Component

  @register "Apollos.storyAd"

  imageUrl: ->
    self = @
    return self.data().imageUrl

  title: ->
    self = @
    return self.data().title

  description: ->
    self = @
    return self.data().description

  url: ->
    self = @
    return self.data().url
