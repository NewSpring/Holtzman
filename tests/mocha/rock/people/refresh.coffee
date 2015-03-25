MochaWeb?.testOnly ->
  describe "Rock people.refresh function", ->

    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.people
      return

    it "should exist", ->
      chai.assert.isDefined Rock.people.refresh
    it "should be a function", ->
      chai.assert.isFunction Rock.people.refresh

    it "should call refresh entity", (done) ->
      originalRefresh = Rock.refreshEntity
      originalAliases = Rock.people.refreshAliases

      Rock.refreshEntity = (query, type, name, throwErrors) ->
        chai.assert.equal query, "api/People
          ?$expand=
            PhoneNumbers,
            PhoneNumbers/NumberTypeValue,
            Photo,
            RecordTypeValue
          &$select=
            AnniversaryDate,
            PhoneNumbers/Number,
            PhoneNumbers/NumberTypeValue/Value,
            BirthDay,
            BirthMonth,
            BirthYear,
            RecordStatusValueId,
            EmailPreference,
            Email,
            SuffixValueId,
            TitleValueId,
            MaritalStatusValueId,
            Gender,
            Photo/Path,
            Photo/Id,
            GivingGroupId,
            Id,
            FirstName,
            LastName,
            MiddleName,
            NickName,
            Guid
          &$filter=
            IsSystem eq false
          and
            RecordTypeValue/Value eq 'Person'"
        chai.assert.equal type, "person"
        chai.assert.equal name, "people"
        chai.assert.equal throwErrors, true

      Rock.people.refreshAliases = (param1, param2) ->
        chai.assert.equal param1, true
        chai.assert.equal param2, true

        Rock.refreshEntity = originalRefresh
        Rock.people.refreshAliases = originalAliases
        done()

      Rock.people.refresh true
