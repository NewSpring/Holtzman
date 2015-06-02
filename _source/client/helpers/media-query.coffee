
# remove for junction.debounce once stable
class _debounce

  constructor: (@data) ->
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    @.callback = @data
    @.ticking = false

  update: =>
    @.callback and @.callback()
    @.ticking = false

  requestTick: =>
    unless @.ticking
      requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)))
      @.ticking = true

  handleEvent: =>
    @.requestTick()



Meteor.startup ->

  # set up var and dependency for tracking
  currentSize = ""
  currentHeight = ""
  currentSizeDep = new Tracker.Dependency
  stylesApplied = []

  # comparator function
  test = (size) ->
    currentSizeDep.depend()
    return currentSize.match size

  testHeight = (size) ->
    currentSizeDep.depend()
    return currentHeight.match size

  # lock Dom events in nonreactive so we never rebind events
  Tracker.nonreactive ->

    # create marker element
    marker = document.createElement("DIV")
    marker.className = "media-query"

    heightMarker = document.createElement("DIV")
    heightMarker.className = "media-query-height"

    # hide it
    marker.style.display = "none !important"
    heightMarker.style.display = "none !important"

    # add it to the Dom
    document.body.appendChild marker
    document.body.appendChild heightMarker

    # update size on resize event
    getSize = ->
      trackingElement = document.getElementsByClassName("media-query")[0]
      heightTrackingElement = document.getElementsByClassName("media-query-height")[0]

      if trackingElement.currentStyle
        currentSize = trackingElement.currentStyle["content"]
        currentHeight = heightTrackingElement.currentStyle["content"]

      else if window.getComputedStyle

        currentSize = document.defaultView.getComputedStyle(
          trackingElement, null # no pseudo support in IE 9, 10 :(
        ).getPropertyValue("content")

        currentHeight = document.defaultView.getComputedStyle(
          heightTrackingElement, null # no pseudo support in IE 9, 10 :(
        ).getPropertyValue("content")

      currentSizeDep.changed()

      return

    # debounce (can move this to junction once stable)
    deouncedGetSize = new _debounce getSize
    window.addEventListener "resize", deouncedGetSize, false

    # fire once for on load checking
    getSize()

  # register global helper for media queries
  Template.registerHelper "MediaQuery", (size) ->
    return test(size)

  Template.registerHelper "MediaQueryHeight", (size) ->
    return testHeight(size)
