MochaWeb?.testOnly ->

  assert = chai.assert

  it 'should fail', ->
    assert.equal 1, 2
