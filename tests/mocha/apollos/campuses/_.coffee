MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'campuses', ->

      if Meteor.isServer

        before ->
          campusProps =
            campusId: 1
            name: 'Greenville'
            shortCode: 'GVL'
            description: 'The Greenville campus.'
            status: 1
            startDate: new Date('01-01-2000 UTC')
            locationIds: [1,2]

          Apollos.campuses.insert campusProps

        it 'should exist', ->
          assert typeof Apollos.campuses is 'object'

        it 'should have a campusId', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.campusId is 'number'
          assert.equal campus.campusId, 1

        it 'should have name', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.name is 'string'
          assert.equal campus.name, 'Greenville'

        it 'should have shortCode', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.shortCode is 'string'
          assert.equal campus.shortCode, 'GVL'

        it 'should have description', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.description is 'string'
          assert.equal campus.description, 'The Greenville campus.'

        it 'should have status', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.status is 'number'
          assert.equal campus.status, 1

        it 'should have startDate', ->
          campus = Apollos.campuses.findOne()
          assert typeof campus.startDate is 'object'
          assert.equal campus.startDate.toDateString(), (new Date('01-01-2000 UTC')).toDateString()

        it 'should have locationIds', ->
          campus = Apollos.campuses.findOne()
          assert.isArray campus.locationIds
          assert.equal campus.locationIds[0], 1
          assert.equal campus.locationIds[1], 2
