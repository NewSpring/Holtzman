import { configure, addDecorator } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: 'Holtzmann',
  url: 'https://github.com/NewSpring/Holtzmann',
  downPanelInRight: true,
});


import "!style!css!sass!../stylesheets/fonts.css";
import "!style!css!sass!../stylesheets/icons.css";
import "!style!css!sass!../stylesheets/masters.scss";


const req = require.context('../imports/', true, /\.story.js$/);

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
