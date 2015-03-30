MochaWeb?.testOnly ->

  assert = chai.assert

  describe 'Apollos', ->
    describe 'funds', ->

      if Meteor.isServer

        before ->
          props =
            fundId: 1
            campusId: 2
            name: 'Meow Fund'
            publicName: 'Public Meow Fund'
            description: 'The meow fund is excellent'
            type: 'Meow type'
            startDate: new Date('01-01-2000 UTC')
            endDate: new Date('01-01-2001 UTC')
            isEnabled: true

          Apollos.funds.insert props

        it 'should exist', ->
          assert typeof Apollos.funds is 'object'

        it 'should have a fundId', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.fundId is 'number'
          assert.equal fund.fundId, 1

        it 'should have a campusId', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.campusId is 'number'
          assert.equal fund.campusId, 2

        it 'should have a name', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.name is 'string'
          assert.equal fund.name, 'Meow Fund'

        it 'should have a publicName', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.publicName is 'string'
          assert.equal fund.publicName, 'Public Meow Fund'

        it 'should have a description', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.description is 'string'
          assert.equal fund.description, 'The meow fund is excellent'

        it 'should have a type', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.type is 'string'
          assert.equal fund.type, 'Meow type'

        it 'should have a startDate', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.startDate is 'object'
          assert.equal fund.startDate.toDateString(), (new Date('01-01-2000 UTC').toDateString())

        it 'should have an endDate', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.endDate is 'object'
          assert.equal fund.endDate.toDateString(), (new Date('01-01-2001 UTC').toDateString())

        it 'should have an isEnabled', ->
          fund = Apollos.funds.findOne()
          assert typeof fund.isEnabled is 'boolean'
          assert.equal fund.isEnabled, true
