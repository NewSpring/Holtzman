import 'regenerator-runtime/runtime';

import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import _ from 'underscore';

window._ = _;
window.jest = {
  fn: (method = () => {}) => method,
};

window.jest = {
  fn: (method = () => {}) => method,
};

setOptions({
  name: 'Holtzmann',
  url: 'https://github.com/NewSpring/Holtzmann',
  downPanelInRight: true,
});

import '!style-loader!css-loader!sass-loader!../stylesheets/fonts.css';
import '!style-loader!css-loader!sass-loader!../stylesheets/icons.css';
import '!style-loader!css-loader!sass-loader!../stylesheets/masters.scss';

window.Meteor = { isServer: false };

// const req = require.context('../imports/', true, /\__stories__\/.*.js$/);
const req = require.context(
  '../imports/', // path where stories live
  true, // recursive?
  /\__stories__\/.*.js$/, // story files match this pattern
);

addDecorator(story => (
  <div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">{story()}</div>
  </div>
));

configure(() => {
  req.keys().forEach(req);
}, module);
