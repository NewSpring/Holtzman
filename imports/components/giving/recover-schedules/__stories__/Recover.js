/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Recover.md";
import Recover, { RecoverableSchedule } from "../Recover";

const story = storiesOf("Schedules", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds([{ name: "light-secondary", value: "#f7f7f7", default: true }]));

story.add(
  "Transfer Your Schedule",
  withReadme(Readme, () => {
    const schedules = [
      {
        details: [
          {
            account: {
              name: "Test Account",
            },
            amount: "1.00",
          },
        ],
        schedule: {
          value: "Weekly",
        },
      },
    ];
    return (
      <div className={"floating"}>
        <div className={"grid__item soft background--light-primary"} style={{ maxWidth: "375px" }}>
          <Recover
            schedules={schedules}
            hide={e => {
              e.preventDefault();
              alert("clicked the primary action button");
            }}
            onClick={e => {
              e.preventDefault();
              alert("clicked the secondary action button");
            }}
          />
        </div>
      </div>
    );
  }),
);
