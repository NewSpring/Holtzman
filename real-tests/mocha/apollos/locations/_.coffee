MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'locations', ->

      if Meteor.isServer

        before ->
          props =
            locationId: 1
            campusId: 2
            locationType: 'Work'
            shortCode: 'GVL'
            street: '111 Meow St.'
            street2: 'Apt. Meow'
            city: 'Meowville'
            state: 'SC'
            zip: '29607'
            geometry:
              type: 'Point'
              coordinates: [12.0,24.0]
              isValid: true

          Apollos.locations.insert props

        it 'should exist', ->
          assert typeof Apollos.locations is 'object'

        it 'should have locationId', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.locationId is 'number'
          assert.equal loc.locationId, 1

        it 'should have campusId', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.campusId is 'number'
          assert.equal loc.campusId, 2

        it 'should have locationType', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.locationType is 'string'
          assert.equal loc.locationType, 'Work'

        it 'should have shortCode', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.shortCode is 'string'
          assert.equal loc.shortCode, 'GVL'

        it 'should have street', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.street is 'string'
          assert.equal loc.street, '111 Meow St.'

        it 'should have street2', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.street2 is 'string'
          assert.equal loc.street2, 'Apt. Meow'

        it 'should have city', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.city is 'string'
          assert.equal loc.city, 'Meowville'

        it 'should have state', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.state is 'string'
          assert.equal loc.state, 'SC'

        it 'should have zip', ->
          loc = Apollos.locations.findOne()
          assert typeof loc.zip is 'string'
          assert.equal loc.zip, '29607'

        # it 'should have geometry', ->
        #   loc = Apollos.locations.findOne()
        #   assert typeof loc.geometry is 'object'
        #   assert typeof loc.geometry.type is 'string'
        #   assert.equal loc.geometry.type, 'Point'
        #   assert.isArray loc.geometry.coordinates
        #   assert.equal loc.geometry.coordinates[0], 12
        #   assert.equal loc.geometry.coordinates[1], 24
        #   assert typeof loc.geometry.isValid is 'boolean'
        #   assert.equal loc.geometry.isValid, true
