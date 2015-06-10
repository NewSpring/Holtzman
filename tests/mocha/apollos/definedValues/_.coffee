MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'definedValues', ->

      if Meteor.isServer

        before ->
          props =
            definedTypeGuid: '12345678-1234-1234-1234-123456789012'
            definedTypeId: 1
            definedValueId: 2
            value: 'meow'
            description: 'meow meow meow'
            definedValueGuid: '12345678-1234-1234-1234-123456789012'

          Apollos.definedValues.insert props

        it 'should exist', ->
          assert typeof Apollos.definedValues is 'object'

        it 'should have a definedTypeGuid', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.definedTypeGuid is 'string'
          assert.equal def.definedTypeGuid, '12345678-1234-1234-1234-123456789012'

        it 'should have a definedTypeId', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.definedTypeId is 'number'
          assert.equal def.definedTypeId, 1

        it 'should have a definedValueId', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.definedValueId is 'number'
          assert.equal def.definedValueId, 2

        it 'should have a value', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.value is 'string'
          assert.equal def.value, 'meow'

        it 'should have a description', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.description is 'string'
          assert.equal def.description, 'meow meow meow'

        it 'should have a definedValueGuid', ->
          def = Apollos.definedValues.findOne()
          assert typeof def.definedValueGuid is 'string'
          assert.equal def.definedValueGuid, '12345678-1234-1234-1234-123456789012'
