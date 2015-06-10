MochaWeb?.testOnly ->

  describe "Apollos validate.isBcryptHash function", ->

    shouldBeValid = (str) ->
       it "should allow \"#{str}\"", ->
         chai.assert.isTrue Apollos.validate.isBcryptHash(str)

    shouldNotBeValid = (str) ->
       it "should not allow \"#{str}\"", ->
         chai.assert.isFalse Apollos.validate.isBcryptHash(str)

    it "should exist", ->
      chai.assert.isDefined Apollos.validate.isBcryptHash
    it "should be a function", ->
      chai.assert.isFunction Apollos.validate.isBcryptHash
    it "should return a boolean", ->
      chai.assert.isBoolean Apollos.validate.isBcryptHash()

    shouldBeValid "$2a$10$fW10cMOTKKY8yhIQ.vsEmO/TgCM4/IpVM.2axXYO53GFB0xSzNsTe"
    shouldNotBeValid "$2a$08$fW10cMOTKKY8yhIQ.vsEmO/TgCM4/IpVM.2axXYO53GFB0xSzNsTe"
    shouldNotBeValid ""
    shouldNotBeValid " "
    shouldNotBeValid null
    shouldNotBeValid "$2a$10$fW10cMOTKKY8yhIQ.vsEmO/TgCM4/IpVM.2axXYO53GFB0xSzNsTee"
