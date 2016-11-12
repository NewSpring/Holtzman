import { PropTypes } from "react";
import {
  ButtonText,
  cardType,
  Icon,
  isIOS,
  monetize,
  PaymentOptions,
} from "./shared";

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

const ListItem = ({
  transaction,
}) => (
  <div className="soft-half-ends hard-sides">

    <div className="grid" style={{ verticalAlign: "middle" }}>

      <div className="grid__item two-thirds" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-secondary flush text-left">
          {transaction.label}
        </h5>
      </div>

      <div className="grid__item one-third text-right" style={{ verticalAlign: "middle" }}>
        <h5 className="text-dark-secondary flush">
          {monetize(transaction.value)}
        </h5>
      </div>

    </div>
  </div>
);

ListItem.propTypes = {
  transaction: PropTypes.object,
};

const ActionButton = ({
  completeGift,
  payment,
  savedAccount,
  schedules,
  scheduleToRecover,
}) => {
  if (isIOS()) {
    return (
      <div>
        <p className="text-dark-secondary">
          <small>
            <em>
              Due to restrictions with your operating system,
              you must complete your gift in the browser.
            </em>
          </small>
        </p>
        <button
          className="btn soft-half-top one-whole"
          onClick={completeGift}
        >
          Complete Gift in Browser
        </button>
      </div>
    );
  }
  return (
    <button className="btn soft-half-top one-whole" type="submit">
      <ButtonText
        payment={payment}
        savedAccount={savedAccount}
        schedules={schedules}
        scheduleToRecover={scheduleToRecover}
      />
      &nbsp;
      <Icon
        cardType={
          cardType(payment, savedAccount)
        }
      />
    </button>
  );
};

ActionButton.propTypes = {
  completeGift: PropTypes.func,
  payment: PropTypes.object,
  savedAccount: PropTypes.object,
  schedules: PropTypes.array,
  scheduleToRecover: PropTypes.bool,
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
