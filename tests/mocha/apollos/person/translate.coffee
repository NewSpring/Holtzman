MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'person', ->
      describe 'translate', ->

        if Meteor.isServer

          # unknown person
          getPersonProps = ->
            Id: 34567
            PersonId: 34567
            Guid: '12345678-1234-1234-1234-123456789013'
            FirstName: 'Jim'
            MiddleName: 'Allen'
            LastName: 'Bo'
            NickName: 'Jimmy'
            Email: 'jim@jimmy.bo'
            BirthDay: 1
            BirthMonth: 1
            BirthYear: 2000
            Gender: 1
            RecordStatusValueId: 3
            TitleValueId: 1
            SuffixValueId: 1
            MaritalStatusValueId: 1
            GivingGroupId: 1
            EmailPreference: 1
            Photo:
              Path: '//meow.com/meow'
              Id: 1
            AnniversaryDate: '2015-03-10T00:00:00'
            PhoneNumbers: [
              NumberTypeValue:
                Value: 'Mobile'
              Number: '1123456789'
            ,
              NumberTypeValue:
                Value: 'Home'
              Number: '1123456789'
            ,
              NumberTypeValue:
                Value: 'Work'
              Number: '1123456789'
            ]


          it 'should exist', ->
            assert.isDefined Apollos.person.translate

          it 'should be a function', ->
            assert typeof Apollos.person.translate is 'function'

          describe 'when person does not exist', ->

            it 'should return new translated person', ->
              person = getPersonProps()
              translate = Apollos.person.translate(person, "ROCK")
              assert.equal translate.personId, 34567
              assert.equal translate.guid, '12345678-1234-1234-1234-123456789013'
              assert.equal translate.firstName, 'Jim'
              assert.equal translate.middleName, 'Allen'
              assert.equal translate.lastName, 'Bo'
              assert.equal translate.nickName, 'Jimmy'
              assert.equal translate.preferredEmail, 'jim@jimmy.bo'
              assert.equal translate.birthDay, 1
              assert.equal translate.birthMonth, 1
              assert.equal translate.birthYear, 2000
              assert.equal translate.gender, 1
              assert.equal translate.recordStatusValueId, 3
              assert.equal translate.titleValueId, 1
              assert.equal translate.suffixValueId, 1
              assert.equal translate.maritalStatusValueId, 1
              assert.equal translate.givingGroupId, 1
              assert.equal translate.emailPreference, 1
              assert.equal translate.photoURL, 'meow.com/meow'
              assert.equal translate.photoId, 1
              assert.equal translate.weddingYear, 2015
              assert.equal translate.weddingMonth, 3
              assert.equal translate.weddingDay, 10
              assert.equal translate.cellPhone, '1123456789'
              assert.equal translate.homePhone, '1123456789'
              assert.equal translate.workPhone, '1123456789'
              assert.equal translate.aliases.length, 0

          describe 'when person does exist', ->

            it 'should lookup by guid', ->
              person = getPersonProps()
              person.Guid = '12345678-1234-1234-1234-123456789012'
              translate = Apollos.person.translate(person, "ROCK")
              assert.equal translate.personId, 12345
              assert.equal translate.guid, '12345678-1234-1234-1234-123456789012'
              assert.equal translate.firstName, 'Jim'
              assert.equal translate.middleName, 'Allen'
              assert.equal translate.lastName, 'Bo'
              assert.equal translate.nickName, 'Jimmy'
              assert.equal translate.preferredEmail, 'jim@jimmy.bo'
              assert.equal translate.birthDay, 1
              assert.equal translate.birthMonth, 1
              assert.equal translate.birthYear, 2000
              assert.equal translate.gender, 1
              assert.equal translate.recordStatusValueId, 3
              assert.equal translate.titleValueId, 1
              assert.equal translate.suffixValueId, 1
              assert.equal translate.maritalStatusValueId, 1
              assert.equal translate.givingGroupId, 1
              assert.equal translate.emailPreference, 1
              assert.equal translate.photoURL, 'meow.com/meow'
              assert.equal translate.photoId, 1
              assert.equal translate.weddingYear, 2015
              assert.equal translate.weddingMonth, 3
              assert.equal translate.weddingDay, 10
              assert.equal translate.cellPhone, '1123456789'
              assert.equal translate.homePhone, '1123456789'
              assert.equal translate.workPhone, '1123456789'
              assert.equal translate.aliases.length, 2

            it 'should lookup by personId', ->
              person = getPersonProps()
              person.Id = 12345
              translate = Apollos.person.translate(person, "ROCK")
              assert.equal translate.personId, 12345
              assert.equal translate.guid, '12345678-1234-1234-1234-123456789013'
              assert.equal translate.firstName, 'Jim'
              assert.equal translate.middleName, 'Allen'
              assert.equal translate.lastName, 'Bo'
              assert.equal translate.nickName, 'Jimmy'
              assert.equal translate.preferredEmail, 'jim@jimmy.bo'
              assert.equal translate.birthDay, 1
              assert.equal translate.birthMonth, 1
              assert.equal translate.birthYear, 2000
              assert.equal translate.gender, 1
              assert.equal translate.recordStatusValueId, 3
              assert.equal translate.titleValueId, 1
              assert.equal translate.suffixValueId, 1
              assert.equal translate.maritalStatusValueId, 1
              assert.equal translate.givingGroupId, 1
              assert.equal translate.emailPreference, 1
              assert.equal translate.photoURL, 'meow.com/meow'
              assert.equal translate.photoId, 1
              assert.equal translate.weddingYear, 2015
              assert.equal translate.weddingMonth, 3
              assert.equal translate.weddingDay, 10
              assert.equal translate.cellPhone, '1123456789'
              assert.equal translate.homePhone, '1123456789'
              assert.equal translate.workPhone, '1123456789'
              assert.equal translate.aliases.length, 2



