// @flow
import { monetize } from "../../util/format/currency";
import Forms from "../../components/forms";
import CheckoutButtons from "../checkout-buttons";
import SubFund from "./Subfund";
import ScheduleLayout from "./Schedule";

import Currency from "../../components/currency";
import ButtonSmall from "../../components/buttons/small";

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
  setCanCheckout: Function,
}

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
}: ILayout) => (
  <div className="push-top@handheld soft-half-top@lap-and-up">
    <Forms.Form
      classes={["text-left", "hard"]}
      submit={(e) => { e.preventDefault(); }}
      id="add-to-cart"
    >

      <div className="display-inline-block">
        {/* Subund Layout */}
        {subfunds && subfunds.map((subfund) => (
          <SubFund
            preFill={preFill}
            key={subfund.id}
            changeAmount={changeAmount}
            changeFund={changeFund}
            {...subfund}
          />
        ))}

        <div className="display-block one-whole soft-bottom">
          {/* Add another fund */}
          {accounts.length > 1 && subfunds.length < 2 && (
            <ButtonSmall
              className="btn--dark-secondary"
              text="Add Another Fund"
              onClick={toggleSecondFund}
              disabled={!subfunds[0].amount}
            />
          )}

          {/* Remove another fund */}
          {accounts.length > 1 && subfunds.length === 2 && (
            <ButtonSmall
              className="btn--alert"
              text="Remove Fund"
              onClick={toggleSecondFund}
            />
          )}
        </div>

        {/* Schedule */}
        <ScheduleLayout setCanCheckout={setCanCheckout} authorized={(total > 0) && authorized} />

        {/* Total information */}
        <h3 className="display-inline-block text-dark-primary push-half-bottom push-half-right">
          my total is
        </h3>
        <span className="display-inline-block text-dark-primary push-half-bottom">
          <Currency baseHeadingSize="1" amount={monetize(total, true)} />
        </span>
      </div>

      <div className="push-top">
        {/* Checkout Buttons */}
        <CheckoutButtons disabled={!canCheckout} />
      </div>

    </Forms.Form>
  </div>
);
