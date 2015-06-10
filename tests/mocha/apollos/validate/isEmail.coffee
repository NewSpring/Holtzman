MochaWeb?.testOnly ->

  describe "Apollos validate.isEmail function", ->

    shouldBeValid = (str) ->
       it "should allow \"#{str}\"", ->
         chai.assert.isTrue Apollos.validate.isEmail(str)

    shouldNotBeValid = (str) ->
       it "should not allow \"#{str}\"", ->
         chai.assert.isFalse Apollos.validate.isEmail(str)

    it "should exist", ->
      chai.assert.isDefined Apollos.validate.isEmail
    it "should be a function", ->
      chai.assert.isFunction Apollos.validate.isEmail
    it "should return a boolean", ->
      chai.assert.isBoolean Apollos.validate.isEmail()

    shouldBeValid "ben.wiley@newspring.cc"
    shouldBeValid "ben.1@newspring.cc"
    shouldBeValid "b.wiley@newspring.cc"
    shouldBeValid "a@d.zz"

    shouldNotBeValid null
    shouldNotBeValid ""
    shouldNotBeValid " "
    shouldNotBeValid " @ .cc"
    shouldNotBeValid " @newspring.cc"
    shouldNotBeValid "ben.wileynewspring.cc"
    shouldNotBeValid "benwileynewspringcc"
    shouldNotBeValid "ben.wiley@newspring"
