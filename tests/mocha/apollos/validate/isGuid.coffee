MochaWeb?.testOnly ->

  describe "Apollos validate.isGuid function", ->

    shouldBeValid = (str) ->
       it "should allow \"#{str}\"", ->
         chai.assert.isTrue Apollos.validate.isGuid(str)

    shouldNotBeValid = (str) ->
       it "should not allow \"#{str}\"", ->
         chai.assert.isFalse Apollos.validate.isGuid(str)

    it "should exist", ->
      chai.assert.isDefined Apollos.validate.isGuid
    it "should be a function", ->
      chai.assert.isFunction Apollos.validate.isGuid
    it "should return a boolean", ->
      chai.assert.isBoolean Apollos.validate.isGuid()

    shouldBeValid "c7f4943f-37cc-4141-9fc4-3305c0740342"
    shouldBeValid "de298d68-fdd1-4a19-9f20-4aab5c7affe8"
    shouldBeValid "A246F8B9-A4E9-4D50-B96E-A927139D3AC4"
    shouldBeValid "D1770126-892C-40FE-B04D-2D457C3815B6"

    shouldNotBeValid "z7f4943f-37cc-4141-9fc4-3305c0740342"
    shouldNotBeValid "de298d68-fdd1-4a19-9f20-4aab5c7affe88"
    shouldNotBeValid "Z246F8B9-A4E9-4D50-B96E-A927139D3AC4"
    shouldNotBeValid "D1770126-892C-40FE-B04D-2D457C3815B66"
    shouldNotBeValid ""
    shouldNotBeValid " "
    shouldNotBeValid null
