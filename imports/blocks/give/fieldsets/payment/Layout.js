import { PropTypes } from "react";

import AccountType from "../../../../components/accountType";
import Controls from "../../../../components/controls";
import Forms from "../../../../components/forms";
import { creditCard } from "../../../../util/format";

const DEFAULT_TOGGLES = ["Credit Card", "Bank Account"];

const Header = ({
  override,
}) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Payment Details
    </h4>
  );
};

Header.propTypes = {
  override: PropTypes.object,
};

const BankFields = ({
  payment,
  saveData,
  validate,
}) => {
  if (payment.type !== "ach") return null;
  return (
    <div>
      <Forms.Input
        id="routingNumber"
        name="billing-routing-number"
        label="Routing Number"
        type="tel"
        errorText="Please enter your routing number"
        defaultValue={payment.routingNumber}
        onChange={saveData}
        validation={validate}
        autoFocus
      />

      <Forms.Input
        id="accountNumber"
        name="billing-account-number"
        label="Account Number"
        type="tel"
        errorText="Please enter your account number"
        defaultValue={payment.accountNumber}
        onChange={saveData}
        validation={validate}
      />


      <div className="grid">

        <div className="grid__item one-whole">
          <Forms.Select
            name="billing-account-type"
            id="accountType"
            label="Account Type"
            onChange={saveData}
            validation={validate}
            defaultValue={payment.accountType}
            errorText="Please choose your account type"
            includeBlank
            items={[
              { value: "checking", label: "Checking" },
              { value: "savings", label: "Savings" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

BankFields.propTypes = {
  payment: PropTypes.object,
  saveData: PropTypes.func,
  validate: PropTypes.func,
};

const CardFields = ({
  formatExp,
  payment,
  saveData,
  savedAccount,
  validate,
}) => {
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
          <Icon
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
            validation={(value) => (value.length > 0)}
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

CardFields.propTypes = {
  formatExp: PropTypes.func,
  payment: PropTypes.object,
  saveData: PropTypes.func,
  savedAccount: PropTypes.object,
  validate: PropTypes.func,
};

const Icon = ({
  payment,
  savedAccount,
}) => {
  if (savedAccount && savedAccount.payment && savedAccount.payment.paymentType) {
    return (
      // replace with SVG
      <AccountType width="30px" height="21px" type={savedAccount.payment.paymentType} />
    );
  }

  const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;

  if (!masked) {
    return null;
  }

  if (payment.type === "ach") {
    return (
      <AccountType width="30px" height="21px" type="Bank" />
    );
  }

  if (payment.type === "cc") {
    const getCardType = (card) => {
      const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/gmi;

      const defaultRegex = {
        Visa: /^4[0-9]{0,15}$/gmi,
        MasterCard: /^5$|^5[1-5][0-9]{0,14}$/gmi,
        AmEx: /^3$|^3[47][0-9]{0,13}$/gmi,
        Discover: d,
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const regex in defaultRegex) {
        if (defaultRegex[regex].test(card.replace(/-/gmi, ""))) {
          return regex;
        }
      }

      return null;
    };

    return (
      // replace with SVG
      <AccountType width="30px" height="21px" type={getCardType(masked)} />
    );
  }

  return null;
};

Icon.propTypes = {
  payment: PropTypes.object,
  savedAccount: PropTypes.object,
};

const SavePaymentCheckBox = ({
  savedAccount,
  savePayment,
  shouldSaveState,
  schedules,
  transactionType,
}) => {
  if (
    !savedAccount.id &&
    transactionType !== "guest" &&
    Object.keys(schedules).length === 0
  ) {
    return (
      <Forms.Checkbox
        name="savePayment"
        defaultValue={shouldSaveState}
        clicked={savePayment}
      >
        Save this payment for future contributions
      </Forms.Checkbox>
    );
  }
  return null;
};

SavePaymentCheckBox.propTypes = {
  savedAccount: PropTypes.object,
  savePayment: PropTypes.func,
  shouldSaveState: PropTypes.bool,
  schedules: PropTypes.array,
  transactionType: PropTypes.string,
};

const SavePaymentInput = ({
  saveName,
  savedAccount,
  schedules,
  shouldSaveState,
  payment,
  transactionType,
}) => {
  if (
    shouldSaveState &&
    !savedAccount.id &&
    transactionType !== "guest" &&
    Object.keys(schedules).length === 0
  ) {
    return (
      <Forms.Input
        name="accountName"
        label="Saved Account Name"
        classes={["soft-bottom", "flush-bttom"]}
        errorText="Please enter a name for the account"
        validation={saveName}
        defaultValue={payment.type === "ach" ? "Bank Account" : "Credit Card"}
      />
    );
  }
  return null;
};

SavePaymentInput.propTypes = {
  saveName: PropTypes.func,
  savedAccount: PropTypes.object,
  schedules: PropTypes.array,
  shouldSaveState: PropTypes.bool,
  payment: PropTypes.object,
  transactionType: PropTypes.string,
};

const NextButton = ({
  payment,
  next,
}) => {
  const btnClasses = ["push-left"];

  const ach = (payment.type === "ach" && payment.accountNumber && payment.routingNumber);
  const cc = (
    payment.type === "cc" &&
      payment.cardNumber &&
      payment.expiration && payment.ccv
  );

  let submit = next;
  let disabled = false;
  if (ach || cc) {
    btnClasses.push("btn");
    submit = next;
  } else {
    btnClasses.push("btn--disabled");
    disabled = true;
    submit = (e) => (e.preventDefault());
  }

  return (
    <button
      className={btnClasses.join(" ")}
      disabled={disabled}
      type="submit"
      onClick={submit}
    >
      Next
    </button>
  );
};

NextButton.propTypes = {
  next: PropTypes.func,
  payment: PropTypes.object,
};

const Layout = ({
  back,
  children,
  header,
  formatExp,
  next,
  payment,
  saveData,
  saveName,
  savedAccount,
  savePayment,
  shouldSaveState,
  schedules,
  toggle,
  toggles,
  transactionType,
  validate,
}) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header override={header} />
    </div>

    {children}

    <Controls.Toggle
      items={toggles || DEFAULT_TOGGLES}
      state={payment.type === "ach"}
      toggle={toggle}
    />

    <div className="soft">
      <BankFields
        payment={payment}
        saveData={saveData}
        validate={validate}
      />
      <CardFields
        formatExp={formatExp}
        payment={payment}
        saveData={saveData}
        savedAccount={savedAccount}
        validate={validate}
      />
      <SavePaymentCheckBox
        savedAccount={savedAccount}
        savePayment={savePayment}
        shouldSaveState={shouldSaveState}
        schedules={schedules}
        transactionType={transactionType}
      />
      <SavePaymentInput
        saveName={saveName}
        savedAccount={savedAccount}
        schedules={schedules}
        shouldSaveState={shouldSaveState}
        payment={payment}
        transactionType={transactionType}
      />
    </div>

    <div>
      <a
        href=""
        tabIndex={-1}
        onClick={back}
        className="btn--small btn--dark-tertiary display-inline-block"
      >
        Back
      </a>

      <NextButton
        payment={payment}
        next={next}
      />

    </div>

  </div>
);

Layout.propTypes = {
  back: PropTypes.func,
  children: PropTypes.object,
  header: PropTypes.object,
  formatExp: PropTypes.func,
  next: PropTypes.func,
  payment: PropTypes.object,
  saveData: PropTypes.func,
  saveName: PropTypes.func,
  savedAccount: PropTypes.object,
  savePayment: PropTypes.func,
  shouldSaveState: PropTypes.bool,
  schedules: PropTypes.array,
  toggle: PropTypes.func,
  toggles: PropTypes.object,
  transactionType: PropTypes.string,
  validate: PropTypes.func,
};

export default Layout;
