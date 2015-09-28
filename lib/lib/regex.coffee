_addRegexTestFunction = (regex) ->
  funcName = "is#{regex.charAt(0).toUpperCase()}#{regex.slice(1)}"
  Apollos.validate[funcName] = (str) ->
    return Apollos.regex[regex].test str


Apollos.regex =

  # @TODO choose which email regex to use
  #
  # this was ours
  # email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  #
  # this is what rock uses:
  email: /[\w\.\'_%-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+/

  bcrypt: /^\$2a\$10\$[\/\.a-zA-Z0-9]{53}$/

  phoneNumber: /^[1-9]([0-9]{6}|[0-9]{9})$/

  guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  visa: /^4[0-9]{12}(?:[0-9]{3})?$/

  mastercard: /^5[1-5][0-9]{14}$/

  americanExpress: /^3[47][0-9]{13}$/

  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/

  startOfVisa: /^4[0-9]{0,15}$/

  startOfMastercard: /^5$|^5[1-5][0-9]{0,14}$/

  startOfAmEx: /^3$|^3[47][0-9]{0,13}$/

  startOfDiscover: /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/


Apollos.addRegex = (obj) ->

  for key, value of obj
    Apollos.regex[key] = value

  return


Apollos.validate =

  acceptedCardTypes: ["Visa", "Mastercard", "AmEx", "Discover"]

  guessCardType: (number) ->

    number = number.replace /-/g, ''

    for cardType in Apollos.validate.acceptedCardTypes

      if Apollos.validate["isStartOf#{cardType}"] number
        return cardType

    return false


  getCardType: (number) ->

    number = number.replace /-/g, ''

    for cardType in Apollos.validate.acceptedCardTypes

      if Apollos.validate["is#{cardType}"] number
        return cardType

    return false


  isBcryptHash: (str) ->
    return @.isBcrypt(str)


for regex of Apollos.regex
  _addRegexTestFunction regex
