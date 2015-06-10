MochaWeb?.testOnly ->

  describe "Apollos validate.isPhoneNumber function", ->

    shouldBeValid = (str) ->
       it "should allow \"#{str}\"", ->
         chai.assert.isTrue Apollos.validate.isPhoneNumber(str)

    shouldNotBeValid = (str) ->
       it "should not allow \"#{str}\"", ->
         chai.assert.isFalse Apollos.validate.isPhoneNumber(str)

    it "should exist", ->
      chai.assert.isDefined Apollos.validate.isPhoneNumber
    it "should be a function", ->
      chai.assert.isFunction Apollos.validate.isPhoneNumber
    it "should return a boolean", ->
      chai.assert.isBoolean Apollos.validate.isPhoneNumber()

    shouldBeValid "3305648978"
    shouldBeValid "5648978"

    shouldNotBeValid "33056489788"
    shouldNotBeValid "0305648978"
    shouldNotBeValid "33056487"
    shouldNotBeValid "0308978"
    shouldNotBeValid ""
    shouldNotBeValid " "
    shouldNotBeValid null
