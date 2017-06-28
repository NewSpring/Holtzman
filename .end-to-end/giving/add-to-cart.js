var login = require("../util/login");
var init = function(browser) {
  return browser
    .url(browser.launchUrl + "/give/now")
    .waitForElementPresent("#add-to-cart", 3000);
};
var finish = function(browser) {
  return browser
    .click("h6.outlined--bottom.outlined--light.text-dark-tertiary")
    .waitForElementVisible("#give", 3000)
    .end();
};
module.exports = {
  "Single Cart Item": function(browser) {
    init(browser)
      .setValue("#primary", [1.33, browser.Keys.TAB])
      .assert.value("#primary", "$1.33")
      .assert.value("#primary-select", "125");

    finish(browser);
  },
  "Single Cart Item with button state": function(browser) {
    // navigate to give
    init(browser).click("#sign-in-button");
    // login
    login(browser)
      .waitForElementNotPresent("#accounts", 1000)
      .pause(2000)
      .assert.visible("#sign-in-button.btn--disabled")
      .end();
  },
  "Multiple Cart Item": function(browser) {
    init(browser)
      .setValue("#primary", [1.33, browser.Keys.TAB])
      .click('#add-to-cart button[class*="btn--small"]')
      .setValue("#subfund", [1.41, browser.Keys.TAB])
      .assert.value("#primary", "$1.33")
      .assert.value("#primary-select", "125")
      .assert.value("#subfund", "$1.41")
      .assert.value("#subfund-select", "264")
      .assert.visible(".btn--alert");

    finish(browser);
  },
  "Change Fund": function(browser) {
    init(browser)
      .setValue("#primary", [1.33, browser.Keys.TAB])
      .assert.value("#primary", "$1.33")
      .assert.value("#primary-select", "125")
      .click('#primary-select option[value="264"]')
      .assert.value("#primary-select", "264");

    finish(browser);
  },
  "Setup schedule": function(browser) {
    // navigate to give
    init(browser).click("#sign-in-button");
    // login
    login(browser).waitForElementNotPresent("#accounts", 1000).pause(2000);

    browser
      .setValue("#primary", [1.33, browser.Keys.TAB])
      .assert.elementPresent("#schedule")
      .click('label[for="schedule"]')
      .assert.elementPresent("#frequency")
      .assert.elementPresent("#start")
      .click("#frequency .tag:first-of-type")
      .assert.cssClassPresent("#frequency .tag:first-of-type", "tag--active")
      .click("#start .tag:first-of-type")
      .assert.cssClassPresent("#start .tag:first-of-type", "tag--active")
      .assert.containsText("#sign-in-button", "Review Contribution")
      .click("#sign-in-button")
      .waitForElementVisible("#give", 3000)
      .end();
  },
  "Setup schedule with custom date": function(browser) {
    // navigate to give
    init(browser).click("#sign-in-button");
    // login
    login(browser).waitForElementNotPresent("#accounts", 1000).pause(2000);

    browser
      .setValue("#primary", [1.33, browser.Keys.TAB])
      .assert.elementPresent("#schedule")
      .click('label[for="schedule"]')
      .assert.elementPresent("#frequency")
      .assert.elementPresent("#start")
      .click("#frequency .tag:first-of-type")
      .assert.cssClassPresent("#frequency .tag:first-of-type", "tag--active")
      .click("#start .tag:last-of-type")
      .waitForElementVisible("#datepicker", 3000)
      .click(".DayPicker-Day:not(.DayPicker-Day--disabled)")
      .click("#datepicker button")
      .waitForElementNotPresent("#datepicker", 3000)
      .assert.cssClassPresent("#start .tag:last-of-type", "tag--active")
      .assert.containsText("#sign-in-button", "Review Contribution")
      .click("#sign-in-button")
      .waitForElementVisible("#give", 3000)
      .end();
  },
  "URL Prefilling": function(browser){
    browser
      .url(browser.launchUrl + "/give/now?General%20Fund=10")
      .waitForElementPresent("#add-to-cart", 3000)
      .assert.value("#primary", "$10")
      .assert.value("#primary-select", "125");
    
    finish(browser);
  },
  "URL Prefilling with different fund": function(browser){
    browser
      .url(browser.launchUrl + "/give/now?Campus%20Expansion=30.34")
      .waitForElementPresent("#add-to-cart", 3000)
      .assert.value("#primary", "$30.34")
      .assert.value("#primary-select", "264");
    
    finish(browser);
  }
};
