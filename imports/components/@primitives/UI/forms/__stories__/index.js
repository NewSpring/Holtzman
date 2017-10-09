
/* eslint-disable */
import { storiesOf } from '@storybook/react';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import { withKnobs } from '@storybook/addon-knobs';
import Provider from "/.storybook/mocks/Provider";

export default storiesOf("Forms", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  .addDecorator((story) => <Provider>{story()}</Provider>)
  ;
