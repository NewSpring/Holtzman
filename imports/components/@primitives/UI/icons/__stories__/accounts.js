/* eslint-disable */
import { storiesOf } from "@storybook/react";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./accounts.md";
import { AmEx, Visa, Discover, MasterCard, Bank } from "../Accounts";

const story = storiesOf("Icons", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Accounts",
  withReadme(Readme, () => (
    <div className="text-center">
      <div className="push display-inline-block">
        <AmEx width={"80px"} height={"60px"} />
      </div>
      <div className="push display-inline-block">
        <Visa width={"80px"} height={"60px"} />
      </div>
      <div className="push display-inline-block">
        <Discover width={"80px"} height={"60px"} />
      </div>
      <div className="push display-inline-block">
        <MasterCard width={"80px"} height={"60px"} />
      </div>
      <div className="push display-inline-block">
        <Bank width={"80px"} height={"60px"} />
      </div>
    </div>
  )),
);
