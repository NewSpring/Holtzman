/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import Provider from "/.storybook/mocks/Provider";

import Readme from "./index.md";
import Give from "../";

const story = storiesOf("Give", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-secondary", "light-primary")));

story.add(
  "Give Block",
  withReadme(Readme, () => {
    return (
      <div className="background--light-primary" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <Provider>
          <Give />
        </Provider>
      </div>
    );
  }),
);
