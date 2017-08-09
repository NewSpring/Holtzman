module.exports = function login(browser){
  return browser
    .waitForElementVisible("#accounts", 3000)
    .setValue("#email", ["store-sample@gmail.com", browser.Keys.TAB])
    .setValue("#password", ["sample", browser.Keys.TAB])
    .click("#accounts button");
}
