/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./README.md";
import Offline from "./Offline";

const story = storiesOf("Status", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Offline", withReadme(Readme, () => <Offline />));

story
  .add("Offline with custom link", withReadme(Readme,
    () => <Offline link={text("Link", "hello@newspring.cc")} />
  ));
