/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.ScheduleOverview.md";
import ScheduleOverview from "../ScheduleCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Schedule Overview", withReadme(
    Readme,
    () => {
      const baseHeadingSize = text("Base Heading Size", "2");
      const amount = text("Amount", "$420.00");
      const frequency = text("Frequency", "Once A Month");
      const started = text("Started", "Nov 1, 2015");
      const latest = text("Latest", "Sep 15, 2016");

      return (
        <div className={"floating"}>
          <div className={"grid__item text-left"} style={{ maxWidth: "960px" }}>
            <ScheduleOverview
              amount={amount}
              frequency={frequency}
              started={started}
              latest={latest}
              baseHeadingSize={baseHeadingSize}
              onEditClick={() => alert("42")}
              onDetailClick={() => alert("Schedule Detail Clicked")}
            />
          </div>
        </div>
      );
    }
  ));
