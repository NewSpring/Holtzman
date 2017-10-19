/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import moment from "moment";
import Readme from "./cards.Activity.md";
import Activity from "../ActivityCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Activity",
  withReadme(Readme, () => {
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

    // message
    const defaultMessage = "You did something really cool. Proud of you!";
    const message = text("Message", defaultMessage);

    // linkText
    const defaultLinkText = "Click This Link";
    const linkText = text("Link Text", defaultLinkText);

    // linkUrl
    const defaultLinkUrl = "https://my.newspring.cc/give/now";
    const linkUrl = text("Link URL", defaultLinkUrl);

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <Activity
            status={status}
            date={date}
            message={message}
            linkText={linkText}
            linkUrl={linkUrl}
          />
        </div>
      </div>
    );
  }),
);
