MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'person', ->
      describe 'delete', ->

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
            assert.isDefined Apollos.person.delete

          it 'should be a function', ->
            assert typeof Apollos.person.delete is 'function'

          it 'should delete based on number', ->
            person = getPersonProps()
            person.Id = 191919
            Apollos.person.update person
            assert.equal Apollos.person.delete(191919, "ROCK"), 1

          it 'should delete based on string', ->
            person = getPersonProps()
            person.Id = 181818
            personId = Apollos.person.update person
            assert.equal Apollos.person.delete(personId, "ROCK"), 1
