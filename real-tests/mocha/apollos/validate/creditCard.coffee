MochaWeb?.testOnly ->

  describe "Apollos validate credit card functions", ->

    valid =
      visa: "4012888888881881"
      mastercard: "5105105105105100"
      americanExpress: "378282246310005"
      discover: "6011000990139424"

    shouldBeValid = (funcName, str) ->
       it "should allow #{funcName} \"#{str}\"", ->
         chai.assert.isTrue Apollos.validate[funcName](str)

    shouldNotBeValid = (funcName, str) ->
       it "should not allow #{funcName} \"#{str}\"", ->
         chai.assert.isFalse Apollos.validate[funcName](str)

    it "should exist", ->
      chai.assert.isDefined Apollos.validate.isCreditCard
    it "should be a function", ->
      chai.assert.isFunction Apollos.validate.isCreditCard
    it "should return a boolean", ->
      chai.assert.isBoolean Apollos.validate.isCreditCard()

    it "should exist (visa)", ->
      chai.assert.isDefined Apollos.validate.isVisa
    it "should be a function (visa)", ->
      chai.assert.isFunction Apollos.validate.isVisa
    it "should return a boolean (visa)", ->
      chai.assert.isBoolean Apollos.validate.isVisa()

    it "should exist (isMastercard)", ->
      chai.assert.isDefined Apollos.validate.isMastercard
    it "should be a function (isMastercard)", ->
      chai.assert.isFunction Apollos.validate.isMastercard
    it "should return a boolean (isMastercard)", ->
      chai.assert.isBoolean Apollos.validate.isMastercard()

    it "should exist (isAmericanExpress)", ->
      chai.assert.isDefined Apollos.validate.isAmericanExpress
    it "should be a function (isAmericanExpress)", ->
      chai.assert.isFunction Apollos.validate.isAmericanExpress
    it "should return a boolean (isAmericanExpress)", ->
      chai.assert.isBoolean Apollos.validate.isAmericanExpress()

    it "should exist (isDiscover)", ->
      chai.assert.isDefined Apollos.validate.isDiscover
    it "should be a function (isDiscover)", ->
      chai.assert.isFunction Apollos.validate.isDiscover
    it "should return a boolean (isDiscover)", ->
      chai.assert.isBoolean Apollos.validate.isDiscover()

    shouldBeValid "isCreditCard", valid.visa
    shouldBeValid "isCreditCard", valid.discover
    shouldBeValid "isCreditCard", valid.mastercard
    shouldBeValid "isCreditCard", valid.americanExpress
    shouldNotBeValid "isCreditCard", "12345"
    shouldNotBeValid "isCreditCard", ""
    shouldNotBeValid "isCreditCard", " "
    shouldNotBeValid "isCreditCard", null
    shouldNotBeValid "isCreditCard", " #{valid.visa} "

    shouldBeValid "isVisa", valid.visa
    shouldNotBeValid "isVisa", "12345"
    shouldNotBeValid "isVisa", ""
    shouldNotBeValid "isVisa", " "
    shouldNotBeValid "isVisa", null
    shouldNotBeValid "isVisa", " #{valid.visa} "

    shouldBeValid "isMastercard", valid.mastercard
    shouldNotBeValid "isMastercard", "12345"
    shouldNotBeValid "isMastercard", ""
    shouldNotBeValid "isMastercard", " "
    shouldNotBeValid "isMastercard", null
    shouldNotBeValid "isMastercard", " #{valid.mastercard} "

    shouldBeValid "isDiscover", valid.discover
    shouldNotBeValid "isDiscover", "12345"
    shouldNotBeValid "isDiscover", ""
    shouldNotBeValid "isDiscover", " "
    shouldNotBeValid "isDiscover", null
    shouldNotBeValid "isDiscover", " #{valid.discover} "

    shouldBeValid "isAmericanExpress", valid.americanExpress
    shouldNotBeValid "isAmericanExpress", "12345"
    shouldNotBeValid "isAmericanExpress", ""
    shouldNotBeValid "isAmericanExpress", " "
    shouldNotBeValid "isAmericanExpress", null
    shouldNotBeValid "isAmericanExpress", " #{valid.americanExpress} "
