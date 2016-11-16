/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import Provider from "/.storybook/mocks/Provider";

import Readme from "./index.md";
import Give from "../";

const story = storiesOf("Give", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

const defaultProps = {
  give: {
    savedAccount: {}
  },
  dispatch: () => {},
  data: {
    campuses: [],
    countries: [],
    savedPayments: [],
    states: [],
  },
};

story
  .add("Give Block", withReadme(Readme, () => {
    return (
      <Provider>
        <Give {...defaultProps} />
      </Provider>
    )
  }));
