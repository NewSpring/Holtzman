

# Write your tests here!
# Here is an example.
casper.test.begin 'Sample Test', 1, (test) ->
  casper.start 'http://localhost:3000', ->
  @waitForSelector 'body', ->
    test.assert true, 'True is true'
  casper.run -> test.done()