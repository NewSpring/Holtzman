
class Apollos.Forms.NumberInput extends Apollos.Forms.Input

  @register "Apollos.Forms.NumberInput"

  vars: -> super.concat [

    showKeyboard: false
    keyboardAmount: null

  ]
  # events: -> super.concat[
  #
  #   "focus input": @.focused
  #
  #
  #   "blur input": @.blurred
  #
  #   # can this be a change event?
  #   "focus input, keyup input, blur input": @.changed
  #
  #   "focus input, keyup input": @.active
  #
  # ]
  onRendered: ->

    self = @

    Tracker.autorun ->
      currentAmount = self.keyboardAmount.get()

      self.setValue currentAmount

    super()


  focused: (event) ->
    event.preventDefault()
    @.showKeyboard.set true

  # blurred: (event) ->
  #   event.preventDefault()
  #   @.showKeyboard.set false
