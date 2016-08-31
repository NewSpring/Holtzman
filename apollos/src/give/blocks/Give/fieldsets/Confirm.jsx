import { Component, PropTypes} from "react"
import { AccountType } from "../../../components"
import Moment from "moment"
import { connect } from "react-redux"
import cloneDeep from "lodash.clonedeep";

import { Forms } from "../../../../core/components"

import { openUrl } from "../../../../core/util/inAppLink";

export default class Confirm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }


  state = {
    changePayments: false,
  }

  isIOS = () => (
    typeof cordova !== "undefined" && cordova.platformId === "ios"
  )

  header = () => {
    const { personal } = this.props.data
    return (
      <h4 className="text-center">
        Hi {personal.firstName}! Here are your contribution details.
      </h4>
    )
  }

  scheduleHeader = () => {
    if (this.props.scheduleToRecover) {
      return (
        <h4 className="text-center">
          Transfer Your Schedule
        </h4>
      )
    }
    return (
      <h4 className="text-center">
        Review Your Schedule
      </h4>
    )
  }

  changePaymentHeader = () => {
    return (
      <h4 className="text-center flush-bottom">
        Change Payment Account
      </h4>
    )
  }

  buttonText = () => {

    let { payment } = this.props.data

    if (!payment.accountNumber && !payment.cardNumber) {
      payment = {...this.props.savedAccount.payment}
      payment.type = "ach"
    }

    let text = "Give Now"

    if (Object.keys(this.props.schedules).length) {
      text = "Schedule Now"
    }

    if (this.props.scheduleToRecover) {
      text = "Transfer Now"
    }

    if (payment.accountNumber || payment.cardNumber) {

      const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
      text += ` using ${masked.slice(-4)}`

    }

    return text

  }

  getCardType = () => {

    const { payment } = this.props.data;
    const { savedAccount } = this.props;
    if (savedAccount && savedAccount.payment && savedAccount.payment.paymentType) {
      return savedAccount.payment.paymentType;
    }

    if (payment.type === "ach") {
      return "Bank";
    }

    if (payment.type === "cc") {

      const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/gmi;

      const defaultRegex = {
        Visa: /^4[0-9]{0,15}$/gmi,
        MasterCard: /^5$|^5[1-5][0-9]{0,14}$/gmi,
        AmEx: /^3$|^3[47][0-9]{0,13}$/gmi,
        Discover: d,
      };

      for (let regex in defaultRegex) {
        if (defaultRegex[regex].test(payment.cardNumber.replace(/-/gmi, ""))) {
          return regex;
        }
      }

    }

    return null;

  }

  icon = () => {
    return <AccountType width="30px" height="21px" type={this.getCardType()} />;
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 1) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  listItem = (transaction, key) => {
    return (
      <div key={key} className="soft-half-ends hard-sides">

        <div className="grid" style={{verticalAlign: "middle"}}>

          <div className="grid__item two-thirds" style={{verticalAlign: "middle"}}>
            <h5 className="text-dark-secondary flush text-left">
              {transaction.label}
            </h5>
          </div>

          <div className="grid__item one-third text-right" style={{verticalAlign: "middle"}}>
            <h5 className="text-dark-secondary flush">
              {this.monentize(transaction.value)}
            </h5>
          </div>

        </div>
      </div>
    )
  }

  scheduleItem = (schedule, key) => {

    return (
      <div className="display-inline-block one-whole" key={key}>

        <h5 className="text-dark-secondary text-left">
          Starting on {Moment(schedule.start).format("MMM D, YYYY")}, I will give <span className="text-primary">{this.monentize(this.props.total)}</span> to {schedule.label}. This will occur {schedule.frequency.toLowerCase()}.
        </h5>

      </div>

    )


  }

  renderScheduleConfirm = () => {
    let schedules = []

    for (let schedule in this.props.schedules) {
      schedules.push(this.props.schedules[schedule])
    }

    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.props.header || this.scheduleHeader()}
        </div>

        <div className="soft">
          {schedules.map((schedule, key) => {
            return this.scheduleItem(schedule, key)
          })}

          <button className="btn one-whole push-top soft-sides" type="submit">
            {this.buttonText()} {this.icon()}
          </button>

          {this.renderPaymentOptions()}
        </div>


      </div>
    )
  }

  changeAccounts = (e) => {
    e.preventDefault()

    this.setState({
      changePayments: !this.state.changePayments
    })

  }

  choose = (e) => {
    e.preventDefault()

    const { id } = e.currentTarget
    let act = {}
    for (let account of this.props.savedAccounts) {
      if (Number(account.id) === Number(id)) {
        act = account
        break
      }
    }

    this.props.changeSavedAccount(act)
  }

  completeGift = (e) => {
    e.preventDefault();
    // deep clone
    const props = cloneDeep(this.props);
    const { url, transactions, total, data } = props;
    const { cardNumber, type, accountNumber } = data.payment;

    // remove sensitive information
    delete data.billing; delete data.payment;

    // add last 4 in
    data.payment = {
      last4: type === "cc" ? cardNumber.slice(-4) : accountNumber.slice(-4),
      icon: this.getCardType(),
      type,
    };

    const giveData = encodeURIComponent(
      JSON.stringify({
        url,
        transactions,
        total,
        data,
      })
    );
    console.log(giveData);

    // ensure trailing slash
    let rootUrl = __meteor_runtime_config__.ROOT_URL;
    if (rootUrl[rootUrl.length - 1] !== "/") {
      rootUrl = `${rootUrl}/`;
    }

    const giveUrl = `${rootUrl}give/review?giveData=${giveData}`;
    console.log(giveUrl);
    openUrl(giveUrl);
  }

  renderPaymentOptions = () => {
    return (
      <div>
        {(() => {
          if (this.props.savedAccount.id === null) {
            return (
              <div className="display-block soft-top text-left">
                <h6
                  className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
                  style={{cursor: "pointer"}}
                  onClick={this.props.back}
                >
                  Edit Contribution Details
                </h6>
              </div>
            )
          } else {
            return (
              <div className="display-block soft-top text-left">
                <h6
                  className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
                  style={{cursor: "pointer"}}
                  onClick={this.changeAccounts}
                >
                  Change Payment Accounts
                </h6>
                <br/>
                <h6
                  className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
                  style={{cursor: "pointer"}}
                  onClick={this.props.goToStepOne}
                >
                  Enter New Payment
                </h6>
              </div>
            )
          }
        })()}
      </div>
    )
  }

  renderPaymentOptionsSelect = () => {
    return (
      <div>
        <div className="soft-sides flush-bottom push-double-top@lap-and-up">
          {this.changePaymentHeader()}
        </div>

        <div className="soft">
          {this.props.savedAccounts.map((account, key) => {
            return (
              <div key={key} style={{position: "relative", cursor: "pointer"}} id={account.id} onClick={this.choose}>
                <div  className="soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative">

                  <div className="display-inline-block soft-half-ends one-whole">
                    <h6 className="flush-bottom float-left text-dark-tertiary">{account.name}</h6>
                    {/*<button className="h6 flush-bottom float-right text-primary" id={account.id} onClick={this.choose}>Choose</button>*/}
                  </div>


                  <h5 className="hard one-whole flush-bottom text-dark-tertiary">
                    {account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*")}{account.payment.accountNumber.slice(-4)}
                    <span className="float-right soft-half-left">
                      <AccountType width="40px" height="25px" type={account.payment.paymentType}/>

                    </span>

                  </h5>


                </div>
                <div className="locked-ends locked-sides">
                  <input
                    type="checkbox"
                    id={"label" + account.id}
                    readOnly={true}
                    checked={Number(account.id) === Number(this.props.savedAccount.id)}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "50px"
                    }}
                  />
                <label htmlFor={"label" + account.id} style={{
                    position: "absolute",
                    top: "50%",
                    left: 0
                  }}/>
                </div>
              </div>
            )
          })}

          <button className="btn one-whole push-double-top soft-sides push-half-bottom" onClick={this.changeAccounts}>
            Save and Continue
          </button>

          <button className="btn--small btn--dark-tertiary one-whole soft-sides push-half-ends" onClick={this.props.goToStepOne}>
            Enter New Payment
          </button>

        </div>


      </div>
    )
  }

  renderActionButton = () => {
    if (this.isIOS()) {
      return (
        <div>
          <p className="text-dark-secondary">
            <small>
              <em>
                Due to restrictions you must complete your gift in the browser.
              </em>
            </small>
          </p>
          <button
            className="btn soft-half-top one-whole"
            onClick={this.completeGift}
          >
            Complete Gift in Browser
          </button>
        </div>
      );
    } else {
      return (
        <button className="btn soft-half-top one-whole" type="submit">
          {this.buttonText()} {this.icon()}
        </button>
      );
    }
  }

  render () {

    let transactions = []

    for (let transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction])
    }

    if (this.state.changePayments) {
      return this.renderPaymentOptionsSelect()
    }

    if (Object.keys(this.props.schedules).length) {
      return this.renderScheduleConfirm()
    }

    const { personal } = this.props.data

    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.props.header || this.header()}
        </div>

        <div className="soft">
          <h5 className="text-dark-secodary text-left">
            <small><em>{personal.campus} Campus</em></small>
          </h5>
          <div className="outlined--light outlined--bottom one-whole push-bottom"></div>
          {transactions.map((transaction, key) => {
            return this.listItem(transaction, key)
          })}

          <div className="soft-ends hard-sides">

            <div className="grid" style={{verticalAlign: "middle"}}>

              <div className="grid__item one-half" style={{verticalAlign: "middle"}}>
                <h5 className="text-dark-secondary flush text-left">
                  Total
                </h5>
              </div>

              <div className="grid__item one-half text-right" style={{verticalAlign: "middle"}}>
                <h3 className="text-primary flush">
                  {this.monentize(this.props.total)}
                </h3>
              </div>

            </div>
          </div>


          {this.renderActionButton()}

          {this.renderPaymentOptions()}


        </div>


      </div>
    )
  }
}
