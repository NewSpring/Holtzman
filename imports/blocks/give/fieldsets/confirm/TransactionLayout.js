import { PropTypes } from "react";
import {
  ActionButton,
  ListItem,
  monetize,
  PaymentOptions,
} from "../shared";

const Header = ({ override, personal }) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Hi {personal.firstName}! Here are your contribution details.
    </h4>
  );
};

Header.propTypes = {
  override: PropTypes.object,
  personal: PropTypes.object,
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
}) => (
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

TransactionLayout.propTypes = {
  back: PropTypes.func,
  changeAccounts: PropTypes.func,
  completeGift: PropTypes.func,
  goToStepOne: PropTypes.func,
  header: PropTypes.object,
  payment: PropTypes.object,
  personal: PropTypes.object,
  savedAccount: PropTypes.object,
  schedules: PropTypes.array,
  scheduleToRecover: PropTypes.bool,
  total: PropTypes.number,
  transactions: PropTypes.array,
};

export default TransactionLayout;
