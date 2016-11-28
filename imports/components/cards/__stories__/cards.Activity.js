/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  select,
  text,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import moment from "moment";
import Readme from "./cards.Activity.md";
import Activity from "../cards.Activity";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Activity", withReadme(Readme, () => {
    // status
    const statusOptions = {
      failed: "Failed",
      success: "Success",
      warning: "Warning",
    };
    const defaultStatusValue = "success";
    const status = select("Status", statusOptions, defaultStatusValue);
    const defaultDate = moment().format("L");
    const defaultAmount = "$50";
    const defaultFundName = "General Fund";
    const defaultSavedAccount = "Credit Card";

    const transaction = {
      id: "1234",
      date: text("Date", defaultDate),
      fund: {
        name: text("Fund Name", defaultFundName),
      },
      amount: text("Amount", defaultAmount),
      savedAccount: {
        name: text("Saved Account", defaultSavedAccount),
      },
    };

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <Activity
            status={status}
            transaction={transaction}
          />
        </div>
      </div>);
  }));
