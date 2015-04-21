MochaWeb?.testOnly ->
  describe "Rock person.translate function", ->
    if Meteor.isClient
      it "should not exist on the client", ->
        chai.assert.isUndefined Rock.person
      return

    it "should exist", ->
      chai.assert.isDefined Rock.person.translate
    it "should be a function", ->
      chai.assert.isFunction Rock.person.translate
    it "should return an object", ->
      chai.assert.isObject Rock.person.translate()
    it "should return undefined for an unknown platform", ->
      chai.assert.isUndefined Rock.person.translate({}, "xyz-platform")

    it "should translate nothing into a valid empty person", ->
      rockPerson = Rock.person.translate()

      checkEqual = (key, value) ->
        chai.assert.equal rockPerson[key], value

      checkEqual "IsSystem", false
      checkEqual "RecordStatusValueId", 3
      checkEqual "TitleValueId", null
      checkEqual "FirstName", null
      checkEqual "NickName", null
      checkEqual "MiddleName", null
      checkEqual "LastName", null
      checkEqual "SuffixValueId", null
      checkEqual "PhotoId", null
      checkEqual "BirthDay", null
      checkEqual "BirthMonth", null
      checkEqual "BirthYear", null
      checkEqual "Gender", 0
      checkEqual "MaritalStatusValueId", null
      checkEqual "AnniversaryDate", null
      checkEqual "GivingGroupId", null
      checkEqual "Email", null
      checkEqual "EmailPreference", 0
      checkEqual "Id", null
      checkEqual "Guid", null

    it "should translate an Apollos person into a person", ->
      apollosPerson =
        recordStatusValueId: 1000
        titleValueId: 2000
        firstName: "FIRSTNAME"
        nickName: "NICKNAME"
        middleName: "MIDDLENAME"
        lastName: "LASTNAME"
        suffixValueId: 3000
        photoId: 4000
        birthDay: 5000
        birthMonth: 6000
        birthYear: 7000
        gender: 8000
        maritalStatusValueId: 9000
        weddingYear: 1900
        weddingMonth: 9
        weddingDay: 8
        givingGroupId: 10000
        preferredEmail: "PREFEMAIL"
        emailPreference: 11000
        personId: 12000
        guid: "GUID"

      rockPerson = Rock.person.translate apollosPerson

      checkEqual = (key, value) ->
        chai.assert.equal rockPerson[key], value

      checkEqual "IsSystem", false
      checkEqual "RecordStatusValueId", apollosPerson.recordStatusValueId
      checkEqual "TitleValueId", apollosPerson.titleValueId
      checkEqual "FirstName", apollosPerson.firstName
      checkEqual "NickName", apollosPerson.nickName
      checkEqual "MiddleName", apollosPerson.middleName
      checkEqual "LastName", apollosPerson.lastName
      checkEqual "SuffixValueId", apollosPerson.suffixValueId
      checkEqual "PhotoId", apollosPerson.photoId
      checkEqual "BirthDay", apollosPerson.birthDay
      checkEqual "BirthMonth", apollosPerson.birthMonth
      checkEqual "BirthYear", apollosPerson.birthYear
      checkEqual "Gender", apollosPerson.gender
      checkEqual "MaritalStatusValueId", apollosPerson.maritalStatusValueId
      checkEqual "AnniversaryDate", "1900-09-08T00:00:00"
      checkEqual "Email", apollosPerson.preferredEmail
      checkEqual "EmailPreference", apollosPerson.emailPreference
      checkEqual "Id", apollosPerson.personId
      checkEqual "Guid", apollosPerson.guid
