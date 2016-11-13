import { PropTypes } from "react";

import Controls from "../../../../components/controls";

import {
  BankFields,
  CardFields,
  SavePaymentCheckBox,
  SavePaymentInput,
} from "../shared";

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
