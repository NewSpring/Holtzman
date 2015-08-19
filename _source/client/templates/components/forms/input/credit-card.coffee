

class Apollos.Forms.CreditCard extends Apollos.Forms.Input


  @register "Apollos.Forms.CreditCard"

  vars: ->

    svg =
      height: 40
      width: 54

    super.concat [
      cardType: null
      svg: svg
    ]

  onCreated: ->
    self = @
    if self.data()?.cardType
      self.cardType.set self.data().cardType

  liveFormat: (value) ->

    if not value
      return value

    # remove non numbers
    newValue = value.replace(/[^\d]+/g, "")
    # ensure correct length
    newValue = newValue[0..15]
    # break apart the value every four numbers
    newValue = newValue.match(/.{1,4}/g)

    newValue = newValue.join("-")

    return newValue


  active: (event) ->

    number = event.target.value.substr 0, 19
    card = Apollos.validate.guessCardType number

    if card
      card = card.charAt(0).toLowerCase() + card.slice(1)

    @.cardType.set card

    event.target.value = @.liveFormat event.target.value
    super(event)
