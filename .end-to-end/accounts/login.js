module.exports = {
  "Login In": function(browser) {
    browser
      .url(browser.launchUrl + "/profile")
      .waitForElementVisible("#accounts", 3000)
      .setValue("#email", ["store-sample@gmail.com", browser.Keys.TAB])
      .setValue("#password", ["sample", browser.Keys.TAB])
      .click("#accounts button")
      .waitForElementPresent(".loaded", 5000)
      .assert.containsText(".btn--dark-tertiary", "Sign Out")
      .end();
  }
};
