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

import Readme from "./Remind.md";
import Remind from "../Remind";

const story = storiesOf("Schedules", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Remind Me Later", withReadme(Readme, () => (
    <div className={"floating"}>
      <div className={"grid__item"} style={{ maxWidth: "375px" }}>
        <Remind
          onSubmit={(e) => {
            e.preventDefault();
            alert("clicked the primary action button");
          }}
          back={(e) => {
            e.preventDefault();
            alert("clicked the secondary action button");
          }}
        />
      </div>
    </div>
  )));
