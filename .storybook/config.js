import "regenerator-runtime/runtime";

import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import _ from 'underscore';

window._ = _;
window.jest = {
  fn: (method = () => {}) => method
}

window.jest = {
  fn: (method = () => {}) => method
}

setOptions({
  name: 'Holtzmann',
  url: 'https://github.com/NewSpring/Holtzmann',
  downPanelInRight: true,
});


import "!style!css!sass!../stylesheets/fonts.css";
import "!style!css!sass!../stylesheets/icons.css";
import "!style!css!sass!../stylesheets/masters.scss";

window.Meteor = { isServer: false };

const req = require.context('../imports/', true, /\__stories__\/.*.js$/);

addDecorator((story) => (
  <div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">
      {story()}
    </div>
  </div>
));

configure(() => {
  req.keys().forEach(req)
}, module);
