/* eslint-disable */
import { storiesOf } from "@storybook/react";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import SectionHeader from "../";
import Readme from "./section-header.md";

import SmallButton from "../../buttons/SmallButton";

const story = storiesOf("Section Header", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Section header with button",
  withReadme(Readme, () => (
    <SectionHeader
      title="Activity"
      link={<SmallButton className="floating__item btn--dark-tertiary flush" text="See All" />}
    />
  )),
);
