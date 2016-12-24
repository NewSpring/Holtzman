/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  select,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.SavedPayment.md";
import SavedPaymentCard from "../cards.SavedPayment";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary")))
  ;

const accountTypes = {
  "Visa": "Visa",
  "MasterCard": "MasterCard",
  "AmEx": "AmEx",
  "Discover": "Discover",
  "Bank": "Bank",
}

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story
  .add("SavedPaymentCard", withReadme(Readme, () => {
    // set channel name options
    const paymentAccount = {
      id: text("Id", "1234"),
      name: text("Name", "Yule Brenner"),
      payment: {
        accountNumber: text("Account Number", "4111224499001256"),
        paymentType: select("Payment Type", accountTypes, "Visa")
      }
    };

    return (
      <div className={"floating"}>
        <div className={"grid__item text-left"} style={{ maxWidth: "480px" }}>
          <SavedPaymentCard
            payment={paymentAccount}
            onClick={() => alert('42')}
          />
        </div>
      </div>);
  }));
