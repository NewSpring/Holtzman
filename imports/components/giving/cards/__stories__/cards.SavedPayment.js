/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.SavedPayment.md";
import SavedPaymentCard from "../SavedPaymentCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(
    backgrounds(
      defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary"),
    ),
  );

const accountTypes = {
  Visa: "Visa",
  MasterCard: "MasterCard",
  AmEx: "AmEx",
  Discover: "Discover",
  Bank: "Bank",
};

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story.add(
  "SavedPaymentCard",
  withReadme(Readme, () => {
    // set channel name options
    const paymentAccount = {
      id: text("Id", "1234"),
      name: text("Name", "Yule Brenner"),
      payment: {
        accountNumber: text("Account Number", "4111224499001256"),
        paymentType: select("Payment Type", accountTypes, "Visa"),
      },
    };

    return (
      <div className={"floating"}>
        <div className={"grid__item text-left"} style={{ maxWidth: "480px" }}>
          <SavedPaymentCard payment={paymentAccount} onClick={() => alert("42")} />
        </div>
      </div>
    );
  }),
);
