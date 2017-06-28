var login = require("../util/login");
module.exports = {
  "Login In": function(browser) {
    login(browser.url(browser.launchUrl + "/profile"))
      .waitForElementPresent(".loaded", 5000)
      .assert.containsText(".btn--dark-tertiary", "Sign Out")
      .end();
  }
};
