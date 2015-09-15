MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'person', ->
      describe 'update', ->

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
            assert.isDefined Apollos.person.update

          it 'should be a function', ->
            assert typeof Apollos.person.update is 'function'

          describe 'when unknown person', ->

            it 'should return new person', ->
              person = getPersonProps()
              updateId = Apollos.person.update(person, "ROCK")
              assert.isDefined updateId
              update = Apollos.people.findOne(updateId)
              assert.equal update.personId, 34567
              assert.equal update.guid, '12345678-1234-1234-1234-123456789013'
              assert.equal update.firstName, 'Jim'
              assert.equal update.middleName, 'Allen'
              assert.equal update.lastName, 'Bo'
              assert.equal update.nickName, 'Jimmy'
              assert.equal update.preferredEmail, 'jim@jimmy.bo'
              assert.equal update.birthDay, 1
              assert.equal update.birthMonth, 1
              assert.equal update.birthYear, 2000
              assert.equal update.gender, 1
              assert.equal update.recordStatusValueId, 3
              assert.equal update.titleValueId, 1
              assert.equal update.suffixValueId, 1
              assert.equal update.maritalStatusValueId, 1
              assert.equal update.givingGroupId, 1
              assert.equal update.emailPreference, 1
              assert.equal update.photoURL, 'meow.com/meow'
              assert.equal update.photoId, 1
              assert.equal update.weddingYear, 2015
              assert.equal update.weddingMonth, 3
              assert.equal update.weddingDay, 10
              assert.equal update.cellPhone, '1123456789'
              assert.equal update.homePhone, '1123456789'
              assert.equal update.workPhone, '1123456789'
              assert.equal update.aliases.length, 0
              assert.equal update.updatedBy, 'Rock'

          describe 'when known person', ->

            it 'should update by guid', ->
              person = getPersonProps()
              person.Guid = '12345678-1234-1234-1234-123456789012'
              updateId = Apollos.person.update(person, "ROCK")
              assert.isDefined updateId
              update = Apollos.people.findOne(updateId)
              assert.equal update.personId, 12345
              assert.equal update.guid, '12345678-1234-1234-1234-123456789012'
              assert.equal update.firstName, 'Jim'
              assert.equal update.middleName, 'Allen'
              assert.equal update.lastName, 'Bo'
              assert.equal update.nickName, 'Jimmy'
              assert.equal update.preferredEmail, 'jim@jimmy.bo'
              assert.equal update.birthDay, 1
              assert.equal update.birthMonth, 1
              assert.equal update.birthYear, 2000
              assert.equal update.gender, 1
              assert.equal update.recordStatusValueId, 3
              assert.equal update.titleValueId, 1
              assert.equal update.suffixValueId, 1
              assert.equal update.maritalStatusValueId, 1
              assert.equal update.givingGroupId, 1
              assert.equal update.emailPreference, 1
              assert.equal update.photoURL, 'meow.com/meow'
              assert.equal update.photoId, 1
              assert.equal update.weddingYear, 2015
              assert.equal update.weddingMonth, 3
              assert.equal update.weddingDay, 10
              assert.equal update.cellPhone, '1123456789'
              assert.equal update.homePhone, '1123456789'
              assert.equal update.workPhone, '1123456789'
              assert.equal update.aliases.length, 2
              assert.equal update.updatedBy, 'Rock'

            it 'should update by personId', ->
              person = getPersonProps()
              person.Id = 12345
              updateId = Apollos.person.update(person, "ROCK")
              assert.isDefined updateId
              update = Apollos.people.findOne(updateId)
              assert.equal update.personId, 12345
              assert.equal update.guid, '12345678-1234-1234-1234-123456789013'
              assert.equal update.firstName, 'Jim'
              assert.equal update.middleName, 'Allen'
              assert.equal update.lastName, 'Bo'
              assert.equal update.nickName, 'Jimmy'
              assert.equal update.preferredEmail, 'jim@jimmy.bo'
              assert.equal update.birthDay, 1
              assert.equal update.birthMonth, 1
              assert.equal update.birthYear, 2000
              assert.equal update.gender, 1
              assert.equal update.recordStatusValueId, 3
              assert.equal update.titleValueId, 1
              assert.equal update.suffixValueId, 1
              assert.equal update.maritalStatusValueId, 1
              assert.equal update.givingGroupId, 1
              assert.equal update.emailPreference, 1
              assert.equal update.photoURL, 'meow.com/meow'
              assert.equal update.photoId, 1
              assert.equal update.weddingYear, 2015
              assert.equal update.weddingMonth, 3
              assert.equal update.weddingDay, 10
              assert.equal update.cellPhone, '1123456789'
              assert.equal update.homePhone, '1123456789'
              assert.equal update.workPhone, '1123456789'
              assert.equal update.aliases.length, 2
              assert.equal update.updatedBy, 'Rock'

