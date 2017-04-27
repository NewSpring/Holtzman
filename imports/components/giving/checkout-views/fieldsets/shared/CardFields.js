// @flow
import Forms from "../../../../@primitives/UI/forms";
import { creditCard } from "../../../../../util/format";
import {
  cardType,
  Icon,
} from "./";

type IRenderIcon = {
  payment: Object,
  savedAccount: Object,
};

const RenderIcon = ({
  payment,
  savedAccount,
}: IRenderIcon) => {
  const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
  if (!masked) return null;

  const paymentType = cardType(payment, savedAccount);
  if (!paymentType) return null;

  // replace with SVG
  return <Icon cardType={paymentType} />;
};

type ICardFields = {
  formatExp: Function,
  payment: Object,
  saveData: Function,
  savedAccount: Object,
  validate: Function,
};

const CardFields = ({
  formatExp,
  payment,
  saveData,
  savedAccount,
  validate,
}: ICardFields) => {
  if (payment.type === "ach") return null;
  return (
    <div>
      <Forms.Input
        name="billing-cc-number"
        id="cardNumber"
        label="Card Number"
        type="tel"
        errorText="Please enter your card number"
        defaultValue={payment.cardNumber}
        format={creditCard}
        onChange={saveData}
        validation={validate}
      >
        <div className="locked locked-right soft-double-right locked-top" style={{ top: "-3px" }}>
          <RenderIcon
            payment={payment}
            savedAccount={savedAccount}
          />
        </div>
      </Forms.Input>
      <div className="grid">
        <div className="grid__item one-half">
          <Forms.Input
            id="expiration"
            name="billing-cc-exp"
            label="Exp (MM/YY)"
            type="tel"
            errorText="Please enter a valid expiration number"
            defaultValue={payment.expiration}
            format={formatExp}
            onChange={saveData}
            validation={validate}
            data-expiry-input
          />
        </div>
        <div className="grid__item one-half">
          <Forms.Input
            id="ccv"
            name="billing-cvv"
            label="CCV"
            type="tel"
            errorText="Please enter a valid ccv number"
            defaultValue={payment.ccv}
            onChange={saveData}
            validation={validate}
          />
        </div>
      </div>
    </div>
  );
};

export default CardFields;

export {
  RenderIcon,
};
