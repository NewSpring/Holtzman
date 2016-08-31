import { Component, PropTypes } from "react";
import { AccountType } from "../../components"

export default class Layout extends Component {

  static propTypes = {
    transactions: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  }

  header = () => {
    const { personal } = this.props.data
    return (
      <h4 className="text-center">
        Hi {personal.firstName}! Here are your contribution details.
      </h4>
    )
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

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`;
    }

    if (!value.length) {
      return `$0.00`;
    }

    value = value.replace(/[^\d.-]/g, "");

    let decimals = value.split(".")[1];
    if ((decimals && decimals.length >= 1) || fixed) {
      value = Number(value).toFixed(2);
      value = String(value);
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${value}`;
  }

  buttonText = () => {

    let { payment } = this.props.data;

    let text = "Give Now";

    if (payment.last4) {
      text += ` using ${payment.last4}`;
    }

    return text;

  }

  icon = (icon) => {
    return <AccountType width="30px" height="21px" type={icon} />;
  }

  render() {
    console.log(this.props);

    let transactions = [];

    for (let transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    const { personal, payment } = this.props.data;

    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.header()}
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

          <button className="btn soft-half-top one-whole" onClick={this.props.onSubmit}>
            {this.buttonText()} {this.icon(payment.icon)}
          </button>

        </div>
      </div>
    );
  }

}
