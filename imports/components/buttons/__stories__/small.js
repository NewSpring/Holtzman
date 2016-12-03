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
import styled from "styled-components";

import Readme from "./small-button.md";

const SmallButton = styled.button`
  padding: 5px 15px 4px;
  font-weight: normal;
  font-size: .75em;
  border-radius: 50px;
  border: 2px solid #858585;
  color: #858585;
  border-radius: 25px;
  &:hover {
    background-color: transparent;
    color: #505050;
    border-color: #505050;
  }
`;


const story = storiesOf("Buttons", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Small", withReadme(
    Readme,
    () => (
      <div>
        <SmallButton className="btn">
          See All
        </SmallButton>
      </div>
    )
  ));
