/* eslint-disable */
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import Provider, { ReduxProvider } from "/.storybook/mocks/Provider";

import Readme from "./index.md";
import CardSlider from "../";
import MetricCard from "../../cards/MetricCard";

const story = storiesOf("Card Slider", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds([{ name: "light-secondary", value: "#f7f7f7", default: true }]))
  ;

story
  .add("Card Slider", withReadme(Readme, () => {

    // Object
    const salvationList = [
      { count: "11,130", label: "Total Salvations" },
      { count: "3,982", label: "Student Salvations at Fuse and Gauntlet" },
    ];

    // Knobs
    salvationList[0].count = text("Card 1 Count", salvationList[0].count);
    salvationList[0].label = text("Card 1 Label", salvationList[0].label);
    salvationList[1].count = text("Card 2 Count", salvationList[1].count);
    salvationList[1].label = text("Card 2 Label", salvationList[1].label);

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <Provider>
            <CardSlider>
              {salvationList.map( ({ count, label }, key) => {
                return <MetricCard count={count} label={label} key={key} />
              })}
            </CardSlider>
          </Provider>
        </div>
      </div>);
  }));
