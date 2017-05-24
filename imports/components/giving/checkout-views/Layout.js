// @flow
import Progress from "../../@primitives/UI/progress/ProgressStep";
import Forms from "../../@primitives/UI/forms";

import { Personal, Payment, Billing, Confirm } from "./fieldsets";
import Loading from "./Loading";
import Err from "./Err";
import Success from "./Success";
import { monetize } from "../../../util/format";

type ILayout = {
  back: Function,
  campuses: Object[],
  changeSavedAccount: Function,
  countries: Object[],
  clear: Function,
  clearData: Function,
  give: Object,
  goToAccounts: Function,
  goToStepOne: Function,
  next: Function,
  onSubmit: Function,
  save: Function,
  savedPayments: Object[],
  states: Object[],
};

let copiedSchedules;

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
}: ILayout) => {
  const {
    data,
    url,
    errors,
    transactions,
    schedule,
    total,
    savedAccount,
    state,
    transactionType,
    scheduleToRecover,
  } = give;

  let { step } = give;

  if (!campuses.length) {
    return <Loading isPreparation />;
  }

  if (["loading", "error", "success"].indexOf(state) > -1) {
    switch (state) {
      case "loading":
        copiedSchedules = { ...schedule };
        return <Loading isSchedule={copiedSchedules.start} isSavedPayment={transactionType === "savedPayment"} />;
      case "error":
        return <Err msg={errors[Object.keys(errors)[0]]} goToStepOne={goToStepOne} />;
      case "success":
        return (
          <Success
            total={monetize(total.toFixed(2))}
            email={data.personal.email}
            guest={transactionType === "guest"}
            onClick={goToAccounts}
            schedule={copiedSchedules}
          />
        );
      default:
        return null;
    }
  }

  const FORM_STEPS = [Personal, Billing, Payment, Confirm];

  if (transactionType === "savedPayment") {
    step -= 1;
    if (step === 0) step = 1;
    FORM_STEPS.shift();
  }

  const Step = FORM_STEPS[step - 1];

  return (
    <Forms.Form
      id="give"
      theme="hard"
      fieldsetTheme="flush soft-top@handheld scrollable soft-double-bottom"
      method="POST"
      submit={onSubmit}
    >
      <Step
        back={back}
        campuses={campuses}
        changeSavedAccount={changeSavedAccount}
        clear={clear}
        clearData={clearData}
        countries={countries}
        data={data}
        errors={errors}
        goToStepOne={goToStepOne}
        next={next}
        save={save}
        savedAccount={savedAccount}
        savedAccounts={savedPayments}
        schedule={schedule}
        scheduleToRecover={scheduleToRecover}
        states={states}
        total={total}
        transactions={transactions}
        transactionType={transactionType}
        url={url}
      >
        <Progress
          steps={FORM_STEPS.length}
          active={step}
        />
      </Step>
    </Forms.Form>
  );
};

export default Layout;
