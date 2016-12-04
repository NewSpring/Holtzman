// @flow
import { monetize } from "../../util/format/currency";
import Forms from "../../components/forms";
import CheckoutButtons from "../checkout-buttons";
import SubFund from "./Subfund";


type ILayout = {
  subfunds: Object[],
  preFill: Function,
  total: number,
  changeAmount: Function,
  changeFund: Function,
}

export default ({ subfunds, preFill, total, changeAmount, changeFund }: ILayout) => (
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

        {/* Total information */}
        <h3 className="display-inline-block text-dark-tertiary push-half-bottom push-half-right">
          so my total is
        </h3>
        <h3 className="display-inline-block text-brand push-half-bottom">
          {monetize(total, true)}
        </h3>
      </div>

      <div className="push-top">
        {/* Checkout Buttons */}
        <CheckoutButtons disabled={total <= 0} />
      </div>

    </Forms.Form>
  </div>
);
