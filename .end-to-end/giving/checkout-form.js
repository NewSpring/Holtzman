var login = require("../util/login.js");

var init = function(browser) {
  return browser
    .url(browser.launchUrl + "/give/now")
    .waitForElementPresent("#add-to-cart", 3000);
};

module.exports = {
  /*
    Signed out, one-time transaction
  */
  "Single Cart Item": function(browser) {
    browser
      .url(browser.launchUrl + "/give/now")
      .waitForElementPresent("#add-to-cart", 3000)
      .setValue("input[type=\"tel\"]", [1.33, browser.Keys.TAB])
      .click("h6.outlined--bottom.outlined--light.text-dark-tertiary")
      .waitForElementVisible("#give", 500);
  },
  "Step 1 Fields": function(browser) {
    browser
      .assert.elementPresent("#firstName")
      .setValue("input[name=\"firstName\"]", ["harambe", browser.Keys.TAB])
      .assert.elementPresent("#lastName")
      .setValue("input[name=\"lastName\"]", ["das gorilla", browser.Keys.TAB])
      .assert.elementPresent("#email")
      .setValue("input[name=\"email\"]", ["insideJob@cincinnatizoo.com", browser.Keys.TAB])
      .assert.elementPresent("#Campus")
      .click('#Campus option[value="3"]')
      .click("#give button");
  },
  "Step 2 Fields": function(browser) {
    browser
      .assert.elementPresent("#streetAddress")
      .setValue("input[name=\"streetAddress\"]", ["3400 Vine St", browser.Keys.TAB])
      .assert.elementPresent("#city")
      .setValue("input[name=\"city\"]", ["Cincinnati", browser.Keys.TAB])
      .click('select[id*="State"] option[value="OH"]')
      .assert.elementPresent("#zip")
      .setValue("input[name=\"zip\"]", ["45220", browser.Keys.TAB, browser.Keys.RETURN]);
  },
  "Step 3 Fields": function(browser) {
    browser
      .assert.elementPresent("#cardNumber")
      .setValue("input[id=\"cardNumber\"]", ["4111111111111111", browser.Keys.TAB])
      // checks for the cc type icon
      .assert.elementPresent(".background--fill.display-inline-block")
      .assert.elementPresent("#expiration")
      .setValue("input[id=\"expiration\"]", ["0120", browser.Keys.TAB])
      .assert.elementPresent("#ccv")
      .setValue("input[id=\"ccv\"]", ["999", browser.Keys.TAB])
      .click("button[type='submit']");
  },
  "Step 4 Submit": function(browser) {
    browser
      .click("button[type='submit']")
      .waitForElementPresent(".text-alert", 15000)
      .end();
  }
}
