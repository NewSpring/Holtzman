// @flow
import moment from "moment";

import { monetize } from "../../../../util/format";
import Currency from "../../../../components/currency";
import SmallButton from "../../../../components/buttons/small";

import {
  ActionButton,
  ListItem,
  PaymentOptions,
} from "../shared";

type IHeader = {
  override?: React$Element<any>,
  goToStepOne: Function,
};

const GIVING_SCHEDULES = {
  "One-Time": "One-Time",
  Monthly: "Every Month",
  Weekly: "Every Week",
  "Bi-Weekly": "Every 2 Weeks",
};

const Header = ({ override, goToStepOne }: IHeader) => {
  if (override) return override;
  return (
    <div className="grid one-whole text-left flush">
      <div className="grid__item three-quarters text-left hard" style={{ verticalAlign: "middle" }}>
        <h3 className="flush-bottom">Review Your Gift</h3>
      </div>
      <div className="grid__item one-quarter text-right" style={{ verticalAlign: "middle" }}>
        <SmallButton
          className="btn--dark-secondary flush-bottom"
          text="Edit"
          onClick={goToStepOne}
        />
      </div>
    </div>
  );
};

type ITransactionLayout = {
  back: Function,
  changeAccounts: Function,
  completeGift: Function,
  goToStepOne: Function,
  header?: React$Element<any>,
  payment: Object,
  personal: Object,
  savedAccount: Object,
  schedule: Object,
  scheduleToRecover: boolean,
  total: number,
  transactions: Object[],
};

const TransactionLayout = ({
  back,
  completeGift,
  changeAccounts,
  goToStepOne,
  header,
  payment,
  personal,
  savedAccount,
  schedule,
  scheduleToRecover,
  total,
  transactions,
}: ITransactionLayout) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header
        override={header}
        personal={personal}
        goToStepOne={goToStepOne}
      />
    </div>

    <div className="soft-sides">
      <div className="one-whole push-bottom" />

      {transactions.map((transaction, key: number) => (
        <div
          key={key}
          className={
            `${(key !== (transactions.length - 1)) && "outlined--light outlined--bottom"}`
          }
        >
          <ListItem transaction={transaction} />
        </div>
      ))}

      {schedule.start && (
        <div className="text-left soft-top outlined--top outlined--light">
          <h5 className="text-dark-primary">Schedule details</h5>
          <div className="soft-half-bottom">
            <h7 className="text-dark-tertiary">Frequency:</h7>
            <p className="display-inline-block soft-half-left flush">
              <em><small>{GIVING_SCHEDULES[schedule.frequency]}</small></em>
            </p>
          </div>
          <div>
            <h7 className="text-dark-tertiary">Starting:</h7>
            <p className="display-inline-block soft-half-left flush">
              <em><small>{moment(schedule.start).format("MMM D, YYYY")}</small></em>
            </p>
          </div>
        </div>
      )}

      <div className="one-whole push-top hard-sides outlined--light outlined--top" />
      <div className="soft-half-ends push-bottom hard-sides outlined--light outlined--bottom">

        <div className="grid" style={{ verticalAlign: "middle" }}>

          <div className="grid__item one-half" style={{ verticalAlign: "middle" }}>
            <h5 className="text-dark-secondary flush text-left">
              Total
            </h5>
          </div>

          <div className="grid__item one-half text-right" style={{ verticalAlign: "middle" }}>
            <div className="display-inline-block">
              <Currency amount={monetize(total)} />
            </div>
          </div>

        </div>
      </div>
      {/* spacer */}
      <div className="one-whole soft-half-top" />
      <ActionButton
        completeGift={completeGift}
        payment={payment}
        savedAccount={savedAccount}
        schedule={schedule}
        scheduleToRecover={scheduleToRecover}
      />

      <PaymentOptions
        back={back}
        changeAccounts={changeAccounts}
        savedAccount={savedAccount}
      />

    </div>
  </div>
);

export default TransactionLayout;

export {
  Header,
};
