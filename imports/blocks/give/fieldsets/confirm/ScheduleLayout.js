import { PropTypes } from "react";
import {
  ButtonText,
  cardType,
  Icon,
  PaymentOptions,
  ScheduleItem,
} from "../shared";

const Header = ({
  override,
  scheduleToRecover,
}) => {
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

Header.propTypes = {
  override: PropTypes.object,
  scheduleToRecover: PropTypes.bool,
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
}) => {
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
            schedules={scheduleList}
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

ScheduleLayout.propTypes = {
  back: PropTypes.func,
  changeAccounts: PropTypes.func,
  goToStepOne: PropTypes.func,
  header: PropTypes.object,
  payment: PropTypes.object,
  savedAccount: PropTypes.object,
  schedules: PropTypes.object,
  scheduleToRecover: PropTypes.bool,
  total: PropTypes.number,
};

export default ScheduleLayout;
