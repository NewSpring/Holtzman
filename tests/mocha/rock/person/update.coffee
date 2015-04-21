MochaWeb?.testOnly ->
  describe "Rock person.update function", ->
    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.person
      return

    it "should exist", ->
      chai.assert.isDefined Rock.person.update
    it "should be a function", ->
      chai.assert.isFunction Rock.person.update

    it "should call Rock.user.create if no guid", (done) ->

      person = "THEPERSON"
      rockPerson =
        Id: 1000

      originalTranslate = Rock.person.translate
      originalCreate = Rock.person.create

      Rock.person.translate = (param1) ->
        chai.assert.equal param1, person
        return rockPerson

      Rock.person.create = (param2) ->
        chai.assert.equal param2, person
        done()

      Rock.person.update person

      Rock.person.create = originalCreate
      Rock.person.translate = originalTranslate

    it "should call Rock.user.create if no id", (done) ->

      person = "THEPERSON"
      rockPerson =
        Guid: "GUID"

      originalTranslate = Rock.person.translate
      originalCreate = Rock.person.create

      Rock.person.translate = (param1) ->
        chai.assert.equal param1, person
        return rockPerson

      Rock.person.create = (param2) ->
        chai.assert.equal param2, person
        done()

      Rock.person.update person

      Rock.person.create = originalCreate
      Rock.person.translate = originalTranslate

    it "should make an API request", (done) ->

      person = "THEPERSON"
      id = 1000
      rockPerson =
        Guid: "GUID"
        Id: id

      originalTranslate = Rock.person.translate
      originalApiRequest = Rock.apiRequest

      Rock.person.translate = (param1) ->
        chai.assert.equal param1, person
        return rockPerson

      Rock.apiRequest = (method, url, param2, callback) ->
        chai.assert.equal method, "PATCH"
        chai.assert.equal url, "api/People/#{id}"
        chai.assert.equal param2, rockPerson
        chai.assert.isFunction callback

        Rock.person.translate = originalTranslate
        Rock.apiRequest = originalApiRequest
        done()

      Rock.person.update person
