/*
* small button
*
* <SmallButton
*   linkUrl={?string}
*   onClick={?Function}
*   disabled={Boolean}
*   text={string}
*   className={?string}
*   style={?Object}
* />
*/

/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import SmallButton from "../small";
import Readme from "./small-button.md";

const story = storiesOf("Buttons", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Small", withReadme(
    Readme,
    () => (
      <div>
        <SmallButton className="btn" disabled>

        </SmallButton>
      </div>
    )
  ));
