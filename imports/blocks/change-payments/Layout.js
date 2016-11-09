
import { Component, PropTypes } from "react";
import AccountType from "../../components/accountType";

const paymentAccount = (account) => {
  const accountFistEight = account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*");
  const accountLastFour = account.payment.accountNumber.slice(-4);

  return accountFistEight + accountLastFour;
};

export default class Layout extends Component {

  static propTypes = {
    savedAccounts: PropTypes.array,
    selectedAccount: PropTypes.string,
    chooseAccount: PropTypes.func,
    changeAccounts: PropTypes.func,
  }

  render() {
    const {
      savedAccounts,
      selectedAccount,
      chooseAccount,
      changeAccounts,
    } = this.props;
    return (
      <div className="soft-double-top">
        <div className="soft-sides flush-bottom push-double-top@lap-and-up">
          <h4 className="text-center flush-bottom">
            Change Payment Account
          </h4>
        </div>

        <div className="soft">
          { savedAccounts.map((account, key) => (
            <div key={key} style={{ position: "relative", cursor: "pointer" }} id={account.id} onClick={chooseAccount}>
              <div className="soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative">

                <div className="display-inline-block soft-half-ends one-whole">
                  <h6 className="flush-bottom float-left text-dark-tertiary">{account.name}</h6>
                  {/* <button className="h6 flush-bottom float-right text-primary" id={accountId}
                    onClick={onClickChoose}>Choose</button>*/}
                </div>


                <h5 className="hard one-whole flush-bottom text-dark-tertiary">
                  {paymentAccount(account)}
                  <span className="float-right soft-half-left">
                    <AccountType
                      width="40px"
                      height="25px"
                      type={account.payment.paymentType}
                    />
                  </span>

                </h5>


              </div>
              <div className="locked-ends locked-sides">
                <input
                  type="checkbox"
                  id={`label${account.id}`}
                  readOnly
                  checked={Number(account.id) === Number(selectedAccount.id)}
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
          <button
            className="btn one-whole push-double-top soft-sides push-bottom"
            onClick={changeAccounts}
          >
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
    );
  }
}
