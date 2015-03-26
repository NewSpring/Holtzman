MochaWeb?.testOnly ->
  describe "Rock people.refreshAliases function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.people
      return

    it "should exist", ->
      chai.assert.isDefined Rock.people.refreshAliases
    it "should be a function", ->
      chai.assert.isFunction Rock.people.refreshAliases

    it "should wait if needed", (done) ->
      throwErrors = true
      wait = true
      originalFunc = Rock.people.refreshAliases

      Rock.people.refreshAliases = (param1, param2) ->
        chai.assert.equal param1, throwErrors
        chai.assert.isUndefined param2

        Rock.people.refreshAliases = originalFunc
        done()

      originalFunc throwErrors, wait

    it "should make an API request", (done) ->
      throwErrors = true
      wait = false
      originalFunc = Rock.apiRequest
      guid = Rock.utilities.makeNewGuid()

      _id = Apollos.people.insert
        personAliasIds: []
        guid: guid

      Rock.apiRequest = (method, url, callback) ->
        chai.assert.equal method, "GET"
        chai.assert.equal url, "api/PersonAlias
          ?$select=
            PersonId,
            AliasPersonId,
            AliasPersonGuid"
        chai.assert.isFunction callback

        callback false,
          data: [
            { PersonId: 1000, AliasPersonGuid: guid, AliasPersonId: 100 }
            { PersonId: 1000, AliasPersonGuid: guid, AliasPersonId: 200 }
          ]

        updatedPerson = Apollos.people.findOne _id
        chai.assert.equal updatedPerson.guid, guid
        chai.assert.equal updatedPerson.personId, 1000
        chai.assert.deepEqual updatedPerson.personAliasIds, [100, 200]
        chai.assert.equal updatedPerson.updatedBy, "Rock"

        Rock.apiRequest = originalFunc
        done()

      Rock.people.refreshAliases throwErrors, wait
