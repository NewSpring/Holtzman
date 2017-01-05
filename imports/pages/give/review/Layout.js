// @flow

import { Component } from "react";
import AccountType from "../../../components/giving/account-type";
import Meta from "../../../components/shared/meta";
import { monetize } from "../../../util/format/";

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
            {monetize(transaction.value)}
          </h5>
        </div>

      </div>
    </div>
  )

  icon = (icon: string): any => (
    <AccountType width="30px" height="21px" type={icon} />
  )

  render() {
    if (!this.props.data) return null;

    const transactions = [];

    // eslint-disable-next-line
    for (const transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    const { personal } = this.props.data;

    return (
      <div
        className="one-whole one-half@palm-wide-and-up soft-double-ends@palm-wide-and-up"
        style={{ margin: "0 auto" }}
      >
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
                  {monetize(this.props.total)}
                </h3>
              </div>

            </div>
          </div>
          <div className="one-whole text-center">
            <button className="btn soft-half-top" onClick={this.props.onSubmit}>
              {"Give Now"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
