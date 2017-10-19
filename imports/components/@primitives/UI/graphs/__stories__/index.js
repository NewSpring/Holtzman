/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import LineGraph from "../LineGraph";

const story = storiesOf("Graphs", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors()));

story.add(
  "Line Graph",
  withReadme(Readme, () => {
    const data = [
      {
        month: "January",
        amount: 100,
        tick: "J",
      },
      {
        month: "February",
        amount: 200,
        tick: "F",
      },
      {
        month: "March",
        amount: 100,
        tick: "M",
      },
      {
        month: "April",
        amount: 0,
        tick: "A",
      },
      {
        month: "May",
        amount: 150,
        tick: "M",
      },
      {
        month: "June",
        amount: 100,
        tick: "J",
      },
      {
        month: "July",
        amount: 200,
        tick: "J",
      },
      {
        month: "August",
        amount: 100,
        tick: "A",
      },
      {
        month: "September",
        amount: 300,
        tick: "S",
      },
      {
        month: "October",
        amount: 100,
        tick: "O",
      },
      {
        month: "November",
        amount: 100,
        tick: "N",
      },
      {
        month: "December",
        amount: 500,
        tick: "D",
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

    const lineColor = text("Line Color", "#6BAC43");
    const lineWidth = text("Line Width", "3");
    const dotColor = text("Dot Color", "#6BAC43");
    const dotSize = text("Dot Size", "3");
    const axisStyles = {
      axis: {
        lineColor: "transparent",
        lineWidth: "0",
      },
      tickLabels: {
        fontSize: "10",
        padding: "5",
        fill: "#858585",
      },
    };
    axisStyles.axis.lineColor = text("Axis Line Color", axisStyles.axis.lineColor);
    axisStyles.axis.lineWidth = text("Axis Line Width", axisStyles.axis.lineWidth);
    axisStyles.tickLabels.fontSize = number("Axis Font Size", axisStyles.tickLabels.fontSize);
    axisStyles.tickLabels.padding = text("Axis Padding", axisStyles.tickLabels.padding);
    axisStyles.tickLabels.fill = text("Axis Text Color", axisStyles.tickLabels.fill);

    return (
      <LineGraph
        data={data}
        lineColor={lineColor}
        lineWidth={lineWidth}
        dotColor={dotColor}
        dotSize={dotSize}
        axisStyles={axisStyles}
      />
    );
  }),
);
