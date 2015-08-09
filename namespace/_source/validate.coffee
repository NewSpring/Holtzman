
# Default validations functions

# can we move these to give?
acceptedCardTypes = ["Visa", "Mastercard", "AmEx", "Discover"]

###

  Guess card type

###
guessCardType = (number) ->

  number = number.replace /-/g, ''

  for cardType in acceptedCardTypes

    if Apollos.validate["isStartOf#{cardType}"] number
      return cardType

  return false

Apollos.validate._addValidateFunc "guessCardType", guessCardType


getCardType = (number) ->

  number = number.replace /-/g, ''

  for cardType in acceptedCardTypes

    if Apollos.validate["is#{cardType}"] number
      return cardType

  return false


Apollos.validate._addValidateFunc "ggCardType", getCardType
