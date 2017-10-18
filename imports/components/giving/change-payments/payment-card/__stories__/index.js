/* eslint-disable */
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  object,
  boolean,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import PaymentAccounts from "./paymentAccounts";
import PaymentCard from "../index";

const accountTypes = {
  "Visa": "Visa",
  "MasterCard": "MasterCard",
  "AmEx": "AmEx",
  "Discover": "Discover",
  "Bank": "Bank",
}

const selectedAccount = {
  "1": "First",
  "2": "Second",
}

const selectAccount = (e) => {
  e.preventDefault;
  alert(`Account ${e.currentTarget.id} Selected`);
};

const story = storiesOf("Change Payments", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Payment Card", withReadme(Readme, () => (
    <div className={"floating"}>
      <div className={"grid__item"} style={{ maxWidth: "480px" }}>
        <PaymentCard
          onClick={selectAccount}
          accountName={text("1: Name", "Swiss Bank")}
          accountId="1"
          paymentAccount={text("1: Number", "4111111111111123")}
          paymentType={select("1: Type", accountTypes, "Visa")}
          selectedAccountId={select("Selected Account", selectedAccount, "1")}
        />
        <PaymentCard
          onClick={selectAccount}
          accountName={text("2: Name", "Goldblume Card")}
          accountId="2"
          paymentAccount={text("2: Number", "6123111111112345")}
          paymentType={select("2: Type", accountTypes, "Discover")}
          selectedAccountId={select("Selected Account", selectedAccount, "1")}
        />

        <button
          className="btn one-whole push-double-top soft-sides push-bottom"
          onClick={() => { alert('Account Changed'); }}
        >
          Change Account
        </button>
      </div>
    </div>
  )));
