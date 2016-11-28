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

    // date
    const defaultDate = moment().format("L");
    const date = text("Date", defaultDate);

    // amount
    const defaultAmount = "$50";
    const amount = text("Amount", defaultAmount);

    // fund name
    const defaultFundName = "General Fund";
    const fundName = text("Fund Name", defaultFundName);

    // saved account
    const defaultSavedAccount = "Credit Card";
    const savedAccount = text("Saved Account", defaultSavedAccount);

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <Activity
            status={status}
            date={date}
            amount={amount}
            fundName={fundName}
            savedAccount={savedAccount}
            onClick={() => { alert("clicked"); }}
          />
        </div>
      </div>);
  }));
