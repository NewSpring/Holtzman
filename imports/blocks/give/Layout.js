import { PropTypes } from "react";

import Controls from "../../components/controls";
import Forms from "../../components/forms";

import { Personal, Payment, Billing, Confirm } from "./fieldsets";
import Loading from "./Loading";
import Err from "./Err";
import Success from "./Success";

// XXX move to util
const monetize = (amount, fixed) => {
  let value = typeof amount === "number" ? `${amount}` : amount;

  if (!value.length) {
    return "$0.00";
  }

  value = value.replace(/[^\d.-]/g, "");

  const decimals = value.split(".")[1];
  if ((decimals && decimals.length >= 2) || fixed) {
    value = Number(value).toFixed(2);
    value = String(value);
  }

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${value}`;
};

const FORM_STEPS = {
  1: Personal,
  2: Billing,
  3: Payment,
  4: Confirm,
};

const Layout = ({
  back,
  campuses,
  changeSavedAccount,
  countries,
  clear,
  clearData,
  give,
  goToAccounts,
  goToStepOne,
  next,
  onSubmit,
  save,
  savedPayments,
  states,
}) => {
  const {
    data,
    url,
    errors,
    step,
    transactions,
    schedules,
    total,
    savedAccount,
    state,
    transactionType,
    scheduleToRecover,
  } = give;

  if (["loading", "error", "success"].indexOf(state) > -1) {
    let copiedSchedules;

    switch (state) {
      case "loading":
        copiedSchedules = { ...schedules };
        return <Loading msg="We're Processing Your Contribution" />;
      case "error":
        return <Err msg={errors[Object.keys(errors)[0]].error} goToStepOne={goToStepOne} />;
      case "success":
        return (
          <Success
            total={monetize(total.toFixed(2))}
            email={data.personal.email}
            guest={transactionType === "guest"}
            onClick={goToAccounts}
            schedules={copiedSchedules}
          />
        );
      default:
        return null;
    }
  }

  const Step = FORM_STEPS[step];

  return (
    <Forms.Form
      id="give"
      theme="hard"
      fieldsetTheme="flush soft-top scrollable soft-double-bottom"
      method="POST"
      submit={onSubmit}
    >
      <Step
        data={data}
        url={url}
        savedAccount={savedAccount}
        transactions={transactions}
        transactionType={transactionType}
        save={save}
        errors={errors}
        clear={clear}
        clearData={clearData}
        next={next}
        back={back}
        total={total}
        campuses={campuses}
        states={states}
        countries={countries}
        schedules={schedules}
        goToStepOne={goToStepOne}
        savedAccounts={savedPayments}
        changeSavedAccount={changeSavedAccount}
        scheduleToRecover={scheduleToRecover}
      >
        <Controls.Progress
          steps={4}
          active={step}
        />
      </Step>
    </Forms.Form>
  );
};

Layout.propTypes = {
  back: PropTypes.func,
  campuses: PropTypes.array,
  changeSavedAccount: PropTypes.func,
  countries: PropTypes.array,
  clear: PropTypes.func,
  clearData: PropTypes.func,
  give: PropTypes.object,
  goToAccounts: PropTypes.func,
  goToStepOne: PropTypes.func,
  next: PropTypes.func,
  onSubmit: PropTypes.func,
  save: PropTypes.func,
  savedPayments: PropTypes.object,
  states: PropTypes.array,
};

export default Layout;
