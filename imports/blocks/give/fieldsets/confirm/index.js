import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import cloneDeep from "lodash.clonedeep";

import AccountType from "../../../../components/accountType";

import { openUrl } from "../../../../util/inAppLink";

import { cardType } from "./shared";

import TransactionLayout from "./TransactionLayout";
import ScheduleLayout from "./ScheduleLayout";

export default class Confirm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    back: PropTypes.func.isRequired,
    goToStepOne: PropTypes.func.isRequired,
    header: PropTypes.string,
    url: PropTypes.string.isRequired,
    clearData: PropTypes.func.isRequired,
    savedAccount: PropTypes.object.isRequired,
    savedAccounts: PropTypes.array.isRequired,
    changeSavedAccount: PropTypes.func.isRequired,
    scheduleToRecover: PropTypes.bool,
    schedules: PropTypes.object,
  }

  state = {
    changePayments: false,
  }

  changePaymentHeader = () => (
    <h4 className="text-center flush-bottom">
      Change Payment Account
    </h4>
  );


  completeGift = (e) => {
    e.preventDefault();
    // deep clone
    const props = cloneDeep(this.props);
    let { url } = props;
    const { transactions, total, data, savedAccount } = props;

    // remove sensitive information
    delete data.billing; delete data.payment;

    // add last 4 in
    data.payment = {};

    if (url.length === 0) url = false;

    const giveData = encodeURIComponent(
      JSON.stringify({
        url,
        transactions,
        savedAccount,
        total,
        data,
        userId: Meteor.userId(),
      })
    );

    // ensure trailing slash
    let rootUrl = __meteor_runtime_config__.ROOT_URL;
    if (rootUrl[rootUrl.length - 1] !== "/") {
      rootUrl = `${rootUrl}/`;
    }

    const giveUrl = `${Meteor.settings.public.giveUrl}give/review?giveData=${giveData}`;
    openUrl(
      giveUrl,
      null,
      () => { this.props.clearData(); },
      null
    );
  }

  choose = (e) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    let act = {};
    for (const account of this.props.savedAccounts) {
      if (Number(account.id) === Number(id)) {
        act = account;
        break;
      }
    }

    this.props.changeSavedAccount(act);
  }

  changeAccounts = (e) => {
    e.preventDefault();

    this.setState({
      changePayments: !this.state.changePayments,
    });
  }

  renderPaymentOptionsSelect = () => (
    <div>
      <div className="soft-sides flush-bottom push-double-top@lap-and-up">
        {this.changePaymentHeader()}
      </div>

      <div className="soft">
        {this.props.savedAccounts.map((account, key) => (/* eslint-disable */
          <div key={key} style={{ position: "relative", cursor: "pointer" }} id={account.id} onClick={this.choose}>
            <div className="soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative">

              <div className="display-inline-block soft-half-ends one-whole">
                <h6 className="flush-bottom float-left text-dark-tertiary">{account.name}</h6>
                {/* <button className="h6 flush-bottom float-right text-primary"
                  id={account.id} onClick={this.choose}>Choose</button>*/ /* eslint-enable */}
              </div>


              <h5 className="hard one-whole flush-bottom text-dark-tertiary">
                {account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*")}{account.payment.accountNumber.slice(-4)}
                <span className="float-right soft-half-left">
                  <AccountType width="40px" height="25px" type={account.payment.paymentType} />

                </span>

              </h5>


            </div>
            <div className="locked-ends locked-sides">
              <input
                type="checkbox"
                id={`label${account.id}`}
                readOnly
                checked={Number(account.id) === Number(this.props.savedAccount.id)}
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  padding: "50px",
                }}
              />
              <label
                htmlFor={`label${account.id}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                }}
              />
            </div>
          </div>
      ))}

        <button className="btn one-whole push-double-top soft-sides push-half-bottom" onClick={this.changeAccounts}>
          Save and Continue
        </button>

        <button className="btn--small btn--dark-tertiary one-whole soft-sides push-half-ends" onClick={this.props.goToStepOne}>
          Enter New Payment
        </button>

      </div>


    </div>
  );


  render() {
    const transactions = [];

    // eslint-disable-next-line
    for (const transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    if (this.state.changePayments) {
      return this.renderPaymentOptionsSelect();
    }

    if (Object.keys(this.props.schedules).length) {
      return (
        <ScheduleLayout
          changeAccounts={this.changeAccounts}

          back={this.props.back}
          goToStepOne={this.props.goToStepOne}
          header={this.props.header}
          payment={this.props.data.payment}
          savedAccount={this.props.savedAccount}
          schedules={this.props.schedules}
          scheduleToRecover={this.props.scheduleToRecover}
          total={this.props.total}
        />
      );
    }

    return (
      <TransactionLayout
        changeAccounts={this.changeAccounts}
        completeGift={this.completeGift}

        back={this.props.back}
        goToStepOne={this.props.goToStepOne}
        header={this.props.header}
        payment={this.props.data.payment}
        personal={this.props.data.personal}
        savedAccount={this.props.savedAccount}
        schedules={this.props.schedules}
        scheduleToRecover={this.props.scheduleToRecover}
        total={this.props.total}
        transactions={transactions}
      />
    );
  }
}
