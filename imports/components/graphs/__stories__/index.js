/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  select,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

// import Provider from "/.storybook/mocks/Provider";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "../README.md";
import LineGraph from "../lineGraph/";

const story = storiesOf("Graphs", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Line Graph", withReadme(Readme, () => {
    // const accounts = [
      // { name: text("Fund 1", "General Fund"), id: 1 },
      // { name: text("Fund 2", "Building Fund"), id: 2 }
    // ]
    return (
      <LineGraph />
    );
  }));
