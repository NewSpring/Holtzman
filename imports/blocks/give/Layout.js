// @flow
import Controls from "../../components/controls";
import Forms from "../../components/forms";

import { Personal, Payment, Billing, Confirm } from "./fieldsets";
import Loading from "./Loading";
import Err from "./Err";
import Success from "./Success";
import { monetize } from "../../util/format";

const FORM_STEPS = [
  Personal,
  Billing,
  Payment,
  Confirm,
];

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

  const Step = FORM_STEPS[step - 1];

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

export default Layout;
