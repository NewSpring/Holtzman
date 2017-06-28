module.exports = {
  "Single Cart Item": function(browser){
    browser.url(browser.launchUrl + "/give/now")
      .waitForElementPresent("#add-to-cart", 3000)
      .setValue("input[type=\"tel\"]", [1.33, browser.Keys.TAB])
      .click("h6.outlined--bottom.outlined--light.text-dark-tertiary")
      .waitForElementVisible("#give", 500)
      .end()
  }
}
