/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  number,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import LineGraph from "../";

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

    // knobs for changing data
    data[0].amount = number("January", data[0].amount);
    data[1].amount = number("February", data[1].amount);
    data[2].amount = number("March", data[2].amount);
    data[3].amount = number("April", data[3].amount);
    data[4].amount = number("May", data[4].amount);
    data[5].amount = number("June", data[5].amount);
    data[6].amount = number("July", data[6].amount);
    data[7].amount = number("August", data[7].amount);
    data[8].amount = number("September", data[8].amount);
    data[9].amount = number("October", data[9].amount);
    data[10].amount = number("November", data[10].amount);
    data[11].amount = number("December", data[11].amount);

    return (
      <LineGraph data={data} />
    );
  }));
