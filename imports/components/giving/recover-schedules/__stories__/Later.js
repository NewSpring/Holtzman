/* eslint-disable */
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Later.md";
import Later from "../Later";

const story = storiesOf("Schedules", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds([{ name: "light-secondary", value: "#f7f7f7", default: true }]))
  ;

story
  .add("Later", withReadme(Readme, () => {
    return(
      <div className={"floating"}>
        <div className={"grid__item soft background--light-primary"} style={{ maxWidth: "375px" }}>
          <Later
            date={"20200101"}
            onClick={(e) => {
              e.preventDefault();
              alert("clicked the primary action button");
            }}
          />
        </div>
      </div>
    );
  }));
