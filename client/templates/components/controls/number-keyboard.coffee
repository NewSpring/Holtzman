

class Apollos.Controls.NumberKeyboard extends Apollos.Component
  @register "Apollos.Controls.NumberKeyboard"


  vars: -> [
    cancelClick: false
  ]

  events: -> [

    "click [data-key], touchstart [data-key]": @.clickedDataKey

    "click [data-close], touchstart [data-close]": @.dismiss

  ]

  stop: (event) ->

    event.stopPropagation()
    event.preventDefault()


  onCreated: ->

    self = @
    typedText = @.data().amount
    @.parent = @.data().parent

    if not typedText
      console.error "you must pass a reactive var in to store the amount"
      return


  onRendered: ->
    self = @

    $(document).off("keyup").on "keyup", (event) ->
      if event.which >= 48 and event.which <= 57
        numPressed = event.which - 48

      else if event.which >= 96 and event.which <= 105
        numPressed = event.which - 96

      else if event.which is 46
        numPressed = -1

      else if event.which is 190 or event.which is 110
        numPressed = "."

      if typeof numPressed isnt "undefined"
        self.doPressAnimation $("[data-key=\"#{numPressed}\"]")
        self.processTypedText numPressed
        # self.parent().updateFund self.typedText.get()



  onDestroyed: ->
    $(document).off("keyup")


  dismiss: (event) ->
    @.parent?.keyboardInstance = null

    Blaze.remove @._internals.templateInstance.view

    @.stop(event) if event

    return

  insertDOMElement: (parent, node, before) ->
    height = $(window).height()
    $(node)
      .appendTo(parent)
      .css
        transform: "translateY(#{height}px)"
      .velocity({translateY: [0, 200], translateZ: 0}, {duration: 300})
    super

  removeDOMElement: (parent, node) ->
    self = @

    $(node).velocity({
      translateY: 250, translateZ: 0
    }, {
      duration: 300
      complete: (elements) ->
        $(node).remove()
    })

  clickedDataKey: (event, template) ->

    if event.type is "touchstart"
      @.cancelClick.set true
    else if @.cancelClick.get()
      @.cancelClick.set false
      return

    @.doPressAnimation event.currentTarget
    keyPressed = event.currentTarget.getAttribute "data-key"
    @.processTypedText keyPressed

    # @.parent().updateFund @.typedText.get()

    @.stop(event) if event



  doPressAnimation: (element) ->

    # can we do this with css?
    jQueryElement = $ element
    jQueryElement.addClass "touched"

    Meteor.setTimeout ->
      jQueryElement.removeClass "touched"
    , 150


  processTypedText: (keyValue) ->

    keyValue = String keyValue
    typedText = @.data().amount
    currentText = typedText.get()

    if not currentText
      currentText = ""

    isEmpty = currentText.length is 0
    decimalIndex = currentText.indexOf "."
    hasDecimal = decimalIndex isnt -1

    if keyValue is "-1"
      # what is this for?
      # @.parent()?.checkForIncrease()
      typedText.set(currentText.slice 0, -1)
      return

    if keyValue is "." and (hasDecimal or isEmpty)
      return

    if keyValue is "0" and isEmpty
      return

    if hasDecimal and currentText.length - decimalIndex > 2
      return

    typedText.set(currentText + keyValue)


  output: ->
    typedText = @.data().amount.get()
    return typedText.replace /\B(?=(\d{3})+(?!\d))/g, ","


  keys: ->
    keys = [1..9].map (v) ->
      return {
        value: v
        display: v
        css: "key"
      }
    keys.push
      value: "."
      display: "&middot;"
    keys.push
      value: 0
      display: 0
    keys.push
      value: -1
      display: '<span class="icon-backspace"></span>'
    return keys
