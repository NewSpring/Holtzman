/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.ScheduleOverview.md";
import ScheduleOverview from "../cards.ScheduleOverview.js";

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
      const fund = text("Fund", "Step Up Fund");
      const frequency = text("Frequency", "Once A Month");
      const started = text("Started", "Nov 1, 2015");
      const latest = text("Latest", "Sep 15, 2016");

      return (
        <div className={"floating"}>
          <div className={"grid__item text-left"} style={{ maxWidth: "960px" }}>
            <ScheduleOverview
              amount={amount}
              fund={fund}
              frequency={frequency}
              started={started}
              latest={latest}
              baseHeadingSize={baseHeadingSize}
              onEditClick={() => alert('42')}
            />
          </div>
        </div>
      );
    }
  ));
