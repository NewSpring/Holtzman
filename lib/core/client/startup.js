
/*

  This force loads the UI pack for every app...

*/
"use strict";

if (Meteor.isClient) {
  require("velocity-animate");
  require("velocity-animate/velocity.ui");
}

// fetch for the browser!
// import "whatwg-fetch"