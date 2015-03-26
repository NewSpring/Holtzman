MochaWeb?.testOnly ->
  describe "Rock person.create function", ->
    _id = null
    rawPerson = null

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.person
      return

    it "should exist", ->
      chai.assert.isDefined Rock.person.create

    it "should be a function", ->
      chai.assert.isFunction Rock.person.create

    it "should set updatedBy to be Rock.name", ->

      _id = Apollos.people.insert
        personAliasIds: []

      rawPerson = Apollos.people.findOne _id
      chai.assert.isUndefined rawPerson.updatedBy
      Rock.person.create rawPerson

      updatedPerson = Apollos.people.findOne _id
      chai.assert.equal updatedPerson.updatedBy, "Rock"

    it "should set guid to be a new guid if unset", ->

      _id = Apollos.people.insert
        personAliasIds: []

      rawPerson = Apollos.people.findOne _id
      chai.assert.isUndefined rawPerson.guid
      Rock.person.create rawPerson

      updatedPerson = Apollos.people.findOne _id
      chai.assert.isTrue Apollos.validate.isGuid updatedPerson.guid

    it "should make two chained API requests", (done) ->
      firstName = "#{Date.now()}"
      _id = Apollos.people.insert
        personAliasIds: []
        firstName: firstName

      realApiRequest = Rock.apiRequest

      Rock.apiRequest = (method, url, person, callback) ->
        chai.assert.equal method, "POST"
        chai.assert.equal url, "api/People"
        chai.assert.equal person.FirstName, firstName
        chai.assert.isFunction callback

        updatedPerson = Apollos.people.findOne _id
        guid = updatedPerson.guid

        Rock.apiRequest = (method2, url2, callback2) ->
          chai.assert.equal method2, "GET"
          chai.assert.equal url2, "api/PersonAlias
            ?$filter=
              AliasPersonGuid eq guid'#{guid}'
            &$select=
              PersonId,
              AliasPersonId"
          chai.assert.isFunction callback2
          chai.assert.equal updatedPerson.personAliasIds.length, 0

          callback2 false,
            data: [
              { AliasPersonId: 1, PersonId: 50 }
              { AliasPersonId: 2, PersonId: 50 }
            ]

          updatedPerson2 = Apollos.people.findOne _id
          chai.assert.equal updatedPerson2.updatedBy, "Rock"
          chai.assert.equal updatedPerson2.personId, 50
          chai.assert.deepEqual updatedPerson2.personAliasIds, [1, 2]

          Rock.apiRequest = realApiRequest
          done()

        callback()

      rawPerson = Apollos.people.findOne _id
      Rock.person.create rawPerson
