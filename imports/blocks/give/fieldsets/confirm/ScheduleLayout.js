// @flow

import {
  ButtonText,
  cardType,
  Icon,
  PaymentOptions,
  ScheduleItem,
} from "../shared";

type IHeader = {
  override?: React$Element<any>,
  scheduleToRecover: boolean,
};

const Header = ({
  override,
  scheduleToRecover,
}: IHeader) => {
  if (override) return override;
  if (scheduleToRecover) {
    return (
      <h4 className="text-center">
        Transfer Your Schedule
      </h4>
    );
  }

  return (
    <h4 className="text-center">
      Review Your Schedule
    </h4>
  );
};

type IScheduleLayout = {
  back: Function,
  changeAccounts: Function,
  goToStepOne: Function,
  header?: React$Element<any>,
  payment: Object,
  savedAccount: Object,
  schedules: Object,
  scheduleToRecover: boolean,
  total: number,
};

const ScheduleLayout = ({
  back,
  changeAccounts,
  goToStepOne,
  header,
  payment,
  savedAccount,
  schedules,
  scheduleToRecover,
  total,
}: IScheduleLayout) => {
  const scheduleList = Object.keys(schedules).map((schedule) => (
    schedules[schedule]
  ));

  return (
    <div>
      <div className="push-double@lap-and-up push">
        <Header
          override={header}
          scheduleToRecover={scheduleToRecover}
        />
      </div>

      <div className="soft">
        {scheduleList.map((schedule, key) => (
          <ScheduleItem
            key={key}
            schedule={schedule}
            total={total}
          />
        ))}

        <button className="btn one-whole push-top soft-sides" type="submit">
          <ButtonText
            payment={payment}
            savedAccount={savedAccount}
            schedules={schedules}
            scheduleToRecover={scheduleToRecover}
          />
          &nbsp;
          <Icon
            cardType={cardType(payment, savedAccount)}
          />
        </button>

        <PaymentOptions
          changeAccounts={changeAccounts}

          back={back}
          goToStepOne={goToStepOne}
          savedAccount={savedAccount}
        />
      </div>


    </div>
  );
};

export default ScheduleLayout;

export {
  Header,
};
