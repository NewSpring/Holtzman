/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

// import Provider from "/.storybook/mocks/Provider";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import LineGraph from "../lineGraph/";

const story = storiesOf("Graphs", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Line Graph", withReadme(Readme, () => {
    const data = [
      {
        month: "January",
        amount: 100,
      },
      {
        month: "Febuary",
        amount: 200,
      },
      {
        month: "March",
        amount: 100,
      },
      {
        month: "April",
        amount: 0,
      },
      {
        month: "May",
        amount: 150,
      },
      {
        month: "June",
        amount: 100,
      },
      {
        month: "July",
        amount: 200,
      },
      {
        month: "August",
        amount: 100,
      },
      {
        month: "September",
        amount: 300,
      },
      {
        month: "October",
        amount: 100,
      },
      {
        month: "November",
        amount: 100,
      },
      {
        month: "December",
        amount: 500,
      },
    ];

    return (
      <LineGraph data={data} />
    );
  }));
