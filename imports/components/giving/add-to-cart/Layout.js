// @flow
import { monetize } from "../../../util/format/currency";
import Forms from "../../@primitives/UI/forms";
import CheckoutButtons from "../checkout-buttons";
import SubFund from "./Subfund";
import ScheduleLayout from "./Schedule";

import Currency from "../../@primitives/typography/currency";
import ButtonSmall from "../../@primitives/UI/buttons/SmallButton";

type ILayout = {
  subfunds: Object[],
  preFill: Function,
  total: number,
  changeAmount: Function,
  changeFund: Function,
  accounts: Object[],
  toggleSecondFund: Function,
  authorized: boolean,
  canCheckout: boolean,
  setCanCheckout: Function
};

export default ({
  subfunds,
  preFill,
  total,
  changeAmount,
  changeFund,
  accounts,
  toggleSecondFund,
  authorized,
  canCheckout,
  setCanCheckout,
}: ILayout) =>
  <div className="push-top@handheld soft-half-top@lap-and-up">
    <Forms.Form
      classes={["text-left", "hard"]}
      submit={e => {
        e.preventDefault();
      }}
      id="add-to-cart"
    >
      <div className="display-inline-block">
        {/* Subund Layout */}
        {subfunds &&
          subfunds.map(subfund =>
            <SubFund
              preFill={preFill}
              key={subfund.id}
              changeAmount={changeAmount}
              changeFund={changeFund}
              {...subfund}
            />
          )}

        <div className="display-block one-whole soft-bottom">
          {/* Add another fund */}
          {accounts.length > 1 &&
            subfunds.length < 2 &&
            <ButtonSmall
              className="btn--dark-secondary"
              text="Add Another Fund"
              onClick={toggleSecondFund}
              disabled={!subfunds[0].amount}
            />}

          {/* Remove another fund */}
          {accounts.length > 1 &&
            subfunds.length === 2 &&
            <ButtonSmall className="btn--alert" text="Remove Fund" onClick={toggleSecondFund} />}
        </div>

        {/* Schedule */}
        <ScheduleLayout setCanCheckout={setCanCheckout} authorized={authorized} />

        {/* Total information */}
        <h3
          className="display-inline-block text-dark-primary push-half-bottom push-half-right"
          style={{ verticalAlign: "middle" }}
        >
          my total is
        </h3>
        <span
          className="display-inline-block text-dark-primary push-half-bottom"
          style={{ verticalAlign: "middle" }}
        >
          <Currency baseHeadingSize="1" className="text-left" amount={monetize(total, true)} />
        </span>
      </div>

      <div className="push-top">
        {/* Checkout Buttons */}
        <CheckoutButtons disabled={!canCheckout} />
      </div>
    </Forms.Form>
  </div>;
