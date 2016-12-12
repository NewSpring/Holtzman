/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text, boolean } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import Currency from "../";

const story = storiesOf("Currency", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Currency", withReadme(
    Readme,
    () => {
      const className = text("Class Name", "text-left");
      const amount = text("Amount", "$420.00");
      const baseSize = text("Base Heading Size", "2");
      const textColor = text("Text Color", "text-dark-primary");
      const roundCurrency = boolean("Round Currency", false);

      return (
        <div className={"floating"}>
          <div className={"grid__item text-left"} style={{ maxWidth: "960px" }}>
            <Currency
              amount={amount}
              baseHeadingSize={baseSize}
              className={className}
              roundCurrency={roundCurrency}
              textColor={textColor}
            />
          </div>
        </div>
      );
    }
  ));
