casper.test.begin('Sample Test', 1, function (test) {
    casper.start('http://localhost:3000', function () {});
    this.waitForSelector('body', function () {
        return test.assert(true, 'True is true');
    });
    return casper.run(function () {
        return test.done();
    });
});