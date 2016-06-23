import { Component, PropTypes} from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../store"
import {
  modal,
 } from "../../../core/store"

import AccountType from "../../components/accountType"

const map = (state) => ({
  savedAccount: state.give.savedAccount,
});
@connect(map)
export default class ChangePayments extends Component {

  state = {
    savedAccount: null,
  }

  changePaymentHeader = () => {
    return (
      <h4 className="text-center flush-bottom">
        Change Payment Account
      </h4>
    )
  }


  changeAccounts = (e) => {
    e.preventDefault()

    this.props.dispatch(giveActions.setAccount(this.state.savedAccount))
    this.props.dispatch(modal.hide());
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

    this.setState({
      savedAccount: act,
    });
  }

  render () {

    let selectedAccount = this.props.currentAccount;
    if (this.state.savedAccount) {
      selectedAccount = this.state.savedAccount
    }

    return (
      <div className="soft-double-top">
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
                    checked={Number(account.id) === Number(selectedAccount.id)}
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

          <button className="btn one-whole push-double-top soft-sides push-bottom" onClick={this.changeAccounts}>
            Change Account
          </button>

          <p >
            <small>
              <em>
                You can enter a new payment account before confirming your contribution.
              </em>
            </small>
          </p>

        </div>


      </div>
    )
  }
}
