module.exports = {
  'Demo test': function(browser) {
    browser
      .url(browser.launchUrl + "/give/now")
      // ...
      .end();
  }
};
