MochaWeb?.testOnly ->
  describe "Rock definedValues object", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.definedValues
      return

    it "should exist", ->
      chai.assert.isDefined Rock.definedValues
    it "should be an object", ->
      chai.assert.isObject Rock.definedValues
    it "should contain definedTypeGuids", ->
      chai.assert.isDefined Rock.definedValues.definedTypeGuids
    it "should contain definedTypeGuids as an object", ->
      chai.assert.isObject Rock.definedValues.definedTypeGuids
    it "should contain definedTypeGuids with the correct guids", ->
      guids =
        suffix: "16F85B3C-B3E8-434C-9094-F3D41F87A740"
        title: "4784CD23-518B-43EE-9B97-225BF6E07846"
        maritalStatus: "B4B92C3F-A935-40E1-A00B-BA484EAD613B"
        status: "8522BADD-2871-45A5-81DD-C76DA07E2E7E"
        phoneType: "8345DD45-73C6-4F5E-BEBD-B77FC83F18FD"
        transactionSource: "4F02B41E-AB7D-4345-8A97-3904DDD89B01"
        creditCardTypes: "2BD4FFB0-6C7F-4890-8D08-00F0BB7B43E9"
        currencyType: "1D1304DE-E83A-44AF-B11D-0C66DD600B81"

      guidNames = Object.keys guids
      existingNames = Object.keys Rock.definedValues.definedTypeGuids
      chai.assert.equal guidNames.length, existingNames.length

      for name in guidNames
        chai.assert.equal Rock.definedValues.definedTypeGuids[name], guids[name]

    it "should contain refresh", ->
      chai.assert.isDefined Rock.definedValues.refresh
    it "should contain refresh as a function", ->
      chai.assert.isFunction Rock.definedValues.refresh
