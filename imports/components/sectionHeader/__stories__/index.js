
/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import SectionHeader from "../";
import Readme from "./section-header.md";

import SmallButton from "../../buttons/small";

const story = storiesOf("Section Header", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Section header with button", withReadme(
    Readme,
    () => (
      <SectionHeader
        title="Activity"
        link={
          <SmallButton
            className="floating__item btn--dark-tertiary flush"
            text="See All"
          />
        }
      />
    )
  ));