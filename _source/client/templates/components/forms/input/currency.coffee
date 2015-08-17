

class Apollos.Forms.Currency extends Apollos.Forms.NumberInput

  @register "Apollos.Forms.Currency"

  onRendered: ->

    self = @


    self.autorun ->

      currentValue = self.value.get()
      currentValue = self.monetize currentValue
      self.setValue currentValue


    super()

  liveFormat: (value) ->

    if not value
      return ""

    # only number
    value = value.replace(/[^\d.-]/g, "")
    value = value.replace /\B(?=(\d{3})+(?!\d))/g, ","
    value = "$#{value}"
    return value

  monetize: (value) ->
    if not value
      return ""

    numberValue = value.replace(/[^\d.-]/g, "")

    if numberValue.match("[+-\/]")
      decimals = numberValue.split(".")[1]
      if decimals.length > 2
        numberValue = Number(numberValue).toFixed(2)
        numberValue = String(numberValue)

    newValue = numberValue.replace /\B(?=(\d{3})+(?!\d))/g, ","
    newValue = "$" + newValue

    if not newValue
      return ""

    return newValue

  active: (event) ->

    event.target.value = @.liveFormat event.target.value
    super(event)


  focused: (event) ->
    event.target.value = "$#{event.target.value}"
    event.target.value = @.monetize event.target.value

    super(event)


  blurred: (event) ->
    event.target.value = @.monetize event.target.value

    super(event)
