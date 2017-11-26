// @flow

import Tabs from "../../../../@primitives/UI/tabs";

import {
  BankFields,
  CardFields,
  SavePaymentCheckBox,
  SavePaymentInput,
} from "../shared";

const DEFAULT_TOGGLES = ["Credit Card", "Bank Account"];

type IHeader = {
  override?: React$Element<any>,
};

const Header = ({
  override,
}: IHeader) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Payment Details
    </h4>
  );
};

type INextButton = {
  next: Function,
  payment: Object,
};

const NextButton = ({
  payment,
  next,
}: INextButton) => {
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
    submit = e => (e.preventDefault());
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

type ILayout = {
  back: Function,
  children?: React$Element<any>,
  header?: React$Element<any>,
  formatExp: Function,
  next: Function,
  payment: Object,
  saveData: Function,
  saveName: Function,
  savedAccount: Object,
  savePayment: Function,
  shouldSaveState: boolean,
  schedule: Object,
  toggle: Function,
  toggles?: string[],
  transactionType: string,
  validate: Function,
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
  schedule,
  toggle,
  toggles,
  transactionType,
  validate,
}: ILayout) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header override={header} />
    </div>

    {children}

    <Tabs
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
      {
        transactionType !== "savedPayment"
          ? <SavePaymentCheckBox
            savedAccount={savedAccount}
            savePayment={savePayment}
            shouldSaveState={shouldSaveState}
            schedule={schedule}
            transactionType={transactionType}
          />
          : null
      }
      <SavePaymentInput
        saveName={saveName}
        savedAccount={savedAccount}
        schedule={schedule}
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

export default Layout;

export {
  Header,
  NextButton,
};
