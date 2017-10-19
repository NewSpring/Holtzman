import "regenerator-runtime/runtime";

import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import _ from "underscore";

window._ = _;
window.jest = {
  fn: (method = () => {}) => method,
};

setOptions({
  name: "Holtzman",
  url: "https://github.com/NewSpring/Holtzman",
  downPanelInRight: true,
});

import "../stylesheets/_fonts.scss";
import "../stylesheets/icons.css";
import "../stylesheets/masters.scss";

window.Meteor = { isServer: false };

const req = require.context("../imports/", true, /\__stories__\/.*.js$/);

addDecorator(story => (
  <div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">{story()}</div>
  </div>
));

function loadStories() {
  req.keys().forEach(module => req(module));
}

configure(loadStories, module);
