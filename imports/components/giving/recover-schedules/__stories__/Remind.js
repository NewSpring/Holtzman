/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import withReadme from "storybook-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Remind.md";
import Remind from "../Remind";

const story = storiesOf("Schedules", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds([{ name: "light-secondary", value: "#f7f7f7", default: true }]));

story.add(
  "Remind Me Later",
  withReadme(Readme, () => (
    <div className={"floating"}>
      <div className={"grid__item soft background--light-primary"} style={{ maxWidth: "375px" }}>
        <Remind
          onSubmit={e => {
            e.preventDefault();
            alert("clicked the primary action button");
          }}
          back={e => {
            e.preventDefault();
            alert("clicked the secondary action button");
          }}
        />
      </div>
    </div>
  )),
);
