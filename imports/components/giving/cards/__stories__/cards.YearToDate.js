/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.YearToDate.md";
import YearToDate from "../YearToDateCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Year To Date", withReadme(Readme, () => {
    const graphData = {
      data: [
        {
          month: "January",
          amount: 300,
          tick: "J",
        },
        {
          month: "February",
          amount: 275,
          tick: "F",
        },
        {
          month: "March",
          amount: 300,
          tick: "M",
        },
        {
          month: "April",
          amount: 325,
          tick: "A",
        },
        {
          month: "May",
          amount: 300,
          tick: "M",
        },
        {
          month: "June",
          amount: 275,
          tick: "J",
        },
        {
          month: "July",
          amount: 300,
          tick: "J",
        },
        {
          month: "August",
          amount: 325,
          tick: "A",
        },
        {
          month: "September",
          amount: 300,
          tick: "S",
        },
        {
          month: "October",
          amount: 275,
          tick: "O",
        },
        {
          month: "November",
          amount: 300,
          tick: "N",
        },
        {
          month: "December",
          amount: 350,
          tick: "D",
        },
      ],
      lineColor: "#6BAC43",
      lineWidth: "2",
      dotColor: "#6BAC43",
      dotSize: "8",
      axisStyles: {
        axis: {
          lineColor: "transparent",
          lineWidth: "0",
        },
        tickLabels: {
          fontSize: "20",
          padding: "8",
          fill: "#858585",
        },
      },
    };
    const amount = text("Amount", "2017");
    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <YearToDate
            amount={amount}
            graphData={graphData}
            linkUrl="https://my.newspring.cc"
          />
        </div>
      </div>
    );
  }));
