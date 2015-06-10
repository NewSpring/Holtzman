MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'groups', ->

      if Meteor.isServer

        before ->
          member1 =
            personId: 1
            role: 'Role 1'
          member2 =
            personId: 2
            role: 'Role 2'
          props =
            groupId: 1
            campusId: 2
            name: 'Meow Group'
            type: 'Meow Type'
            guid: '12345678-1234-1234-1234-123456789012'
            photoURL: 'http://meow.com/meow'
            locationIds: [1,2]
            members: [member1, member2]
            status: 1

          Apollos.groups.insert props

        it 'should exist', ->
          assert typeof Apollos.groups is 'object'

        it 'should have groupId', ->
          group = Apollos.groups.findOne()
          assert typeof group.groupId is 'number'
          assert.equal group.groupId, 1

        it 'should have campusId', ->
          group = Apollos.groups.findOne()
          assert typeof group.campusId is 'number'
          assert.equal group.campusId, 2

        it 'should have name', ->
          group = Apollos.groups.findOne()
          assert typeof group.name is 'string'
          assert.equal group.name, 'Meow Group'

        it 'should have type', ->
          group = Apollos.groups.findOne()
          assert typeof group.type is 'string'
          assert.equal group.type, 'Meow Type'

        it 'should have guid', ->
          group = Apollos.groups.findOne()
          assert typeof group.guid is 'string'
          assert.equal group.guid, '12345678-1234-1234-1234-123456789012'

        it 'should have photoURL', ->
          group = Apollos.groups.findOne()
          assert typeof group.photoURL is 'string'
          assert.equal group.photoURL, 'http://meow.com/meow'

        it 'should have locationIds', ->
          group = Apollos.groups.findOne()
          assert.isArray group.locationIds
          assert.equal group.locationIds[0], 1
          assert.equal group.locationIds[1], 2

        it 'should have members', ->
          group = Apollos.groups.findOne()
          assert.isArray group.members
          assert.equal group.members[0].personId, 1
          assert.equal group.members[1].personId, 2
          assert.equal group.members[0].role, 'Role 1'
          assert.equal group.members[1].role, 'Role 2'

