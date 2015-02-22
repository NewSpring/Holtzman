
describe 'Sample Testing', ->
  before ->
    casper.start 'http://localhost:3000'
    return
  it 'should prove that 1 = 1', ->
    casper.then ->
      (1).should.equal(1)
    return
  it 'should prove that true = true', ->
    casper.then ->
      true.should.be.true
    return
  it 'should prove that false = false', ->
    casper.then ->
      false.should.be.false
    return
  return
