/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Recover.md";
import Recover from "../Recover";
import { RecoverableSchedule } from "../Recover";

const story = storiesOf("Schedules", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Transfer Your Schedule", withReadme(Readme, () => {
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
    return(
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "375px" }}>
          <Recover
            schedules={schedules}
            hide={(e) => {
              e.preventDefault();
              alert("clicked the primary action button");
            }}
            onClick={(e) => {
              e.preventDefault();
              alert("clicked the secondary action button");
            }}
          />
        </div>
      </div>
    );
  }));
