// @flow

import {
  ActionButton,
  ListItem,
  monetize,
  PaymentOptions,
} from "../shared";

type IHeader = {
  override?: React$Element<any>,
  personal: Object,
};

const Header = ({ override, personal }: IHeader) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Hi {personal.firstName}! Here are your contribution details.
    </h4>
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
  schedules: Object,
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
  schedules,
  scheduleToRecover,
  total,
  transactions,
}: ITransactionLayout) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header
        override={header}
        personal={personal}
      />
    </div>

    <div className="soft">
      <h5 className="text-dark-secodary text-left">
        <small><em>{personal.campus} Campus</em></small>
      </h5>
      <div className="outlined--light outlined--bottom one-whole push-bottom" />

      {transactions.map((transaction, key) => (
        <ListItem
          transaction={transaction}
          key={key}
        />
      ))}

      <div className="soft-ends hard-sides">

        <div className="grid" style={{ verticalAlign: "middle" }}>

          <div className="grid__item one-half" style={{ verticalAlign: "middle" }}>
            <h5 className="text-dark-secondary flush text-left">
              Total
            </h5>
          </div>

          <div className="grid__item one-half text-right" style={{ verticalAlign: "middle" }}>
            <h3 className="text-primary flush">
              {monetize(total)}
            </h3>
          </div>

        </div>
      </div>

      <ActionButton
        completeGift={completeGift}
        payment={payment}
        savedAccount={savedAccount}
        schedules={schedules}
        scheduleToRecover={scheduleToRecover}
      />

      <PaymentOptions
        back={back}
        changeAccounts={changeAccounts}
        goToStepOne={goToStepOne}
        savedAccount={savedAccount}
      />

    </div>
  </div>
);

export default TransactionLayout;

export {
  Header,
};
