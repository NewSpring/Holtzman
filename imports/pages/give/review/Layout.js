// @flow

import { Component } from "react";
import AccountType from "../../../components/accountType";
import Meta from "../../../components/meta";

type ILayout = {
  transactions: Object,
  total: number,
  data: Object,
  onSubmit: Function,
};

export default class Layout extends Component {
  props: ILayout;

  header = () => {
    const { personal } = this.props.data;
    return (
      <h4 className="text-center">
        Hi {personal.firstName}! Here are your contribution details.
      </h4>
    );
  }

  listItem = (transaction: Object, key: number) => (
    <div key={key} className="soft-half-ends hard-sides">

      <div className="grid" style={{ verticalAlign: "middle" }}>

        <div className="grid__item two-thirds" style={{ verticalAlign: "middle" }}>
          <h5 className="text-dark-secondary flush text-left">
            {transaction.label}
          </h5>
        </div>

        <div className="grid__item one-third text-right" style={{ verticalAlign: "middle" }}>
          <h5 className="text-dark-secondary flush">
            {this.monetize(transaction.value)}
          </h5>
        </div>

      </div>
    </div>
  )

  // XXX replace the function in PR 1431 with this one
  monetize = (value: string | number, fixed?: boolean): string => {
    let amount = (typeof value === "number") ? `${value}` : value;

    if (!amount || !amount.length) {
      return "$0.00";
    }

    amount = amount.replace(/[^\d.-]/g, "");

    const decimals = amount.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      amount = Number(amount).toFixed(2);
      amount = String(amount);
    }

    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${amount}`;
  }

  buttonText = () => {
    const { payment } = this.props.data;

    let text = "Give Now";

    if (payment.last4) {
      text += ` using ${payment.last4}`;
    }

    return text;
  }

  icon = (icon: string): any => (
    <AccountType width="30px" height="21px" type={icon} />
  )

  render() {
    if (!this.props.data) {
      return null;
    }

    const transactions = [];

    // eslint-disable-next-line
    for (const transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    const { personal } = this.props.data;

    return (
      <div>
        <Meta title="Review Your Contribution" />
        <div className="push-double@lap-and-up push">
          {this.header()}
        </div>

        <div className="soft">
          <h5 className="text-dark-secodary text-left">
            <small><em>{personal.campus} Campus</em></small>
          </h5>
          <div className="outlined--light outlined--bottom one-whole push-bottom" />
          {transactions.map((transaction, key) => (
            this.listItem(transaction, key)
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
                  {this.monetize(this.props.total)}
                </h3>
              </div>

            </div>
          </div>

          <button className="btn soft-half-top one-whole" onClick={this.props.onSubmit}>
            {"Give Now"}
          </button>

        </div>
      </div>
    );
  }
}
