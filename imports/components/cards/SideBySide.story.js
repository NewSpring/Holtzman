/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./README.md";
import SideBySide from "./SideBySide";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Side by side", withReadme(Readme, () => <SideBySide />));

story
  .add("Custom link", withReadme(Readme,
    () => <SideBySide Images={text("Image", "https://aff5fa4925746bf9c161-fb36f18ca122a30f6899af8eef8fa39b.ssl.cf5.rackcdn.com/images/Profile_Mario.aead314d435d8e52d9a4e92a6f799c4eee08081e.jpg")} />
  ));
