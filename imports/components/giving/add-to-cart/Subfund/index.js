
// @Flow

import { Component } from "react";
import { connect } from "react-redux";

import { give as giveActions } from "../../../../data/store";

import Primary from "./Primary";
import Layout from "./Layout";

export const withRedux = connect(null, giveActions);

type ISubFund = {
  accounts: Object[],
  changeAmount: Function,
  changeFund: Function,
  fundId: number,
  id: number,
  preFill: Function,
  primary: boolean,
  amount: number,
};

class SubFund extends Component {
  props: ISubFund;

  state = { active: false }

  componentWillMount() {
    if (this.props.amount) this.setState({ active: true });
  }

  changeAmount = amount => this.props.changeAmount(amount, this.props.fundId)
  changeFund = fund => {
    this.setState({ active: !!fund });
    return this.props.changeFund(Number(fund), this.props.id);
  }

  render() {
    const props = {
      accounts: this.props.accounts,
      active: this.state.active,
      changeAmount: this.changeAmount,
      fundId: this.props.fundId,
      preFill: this.props.preFill,
      changeFund: this.changeFund,
      selectVal: this.props.fundId,
    };

    if (this.props.primary) return <Primary {...props} />;
    return <Layout {...props} />;
  }
}


export default withRedux(SubFund);

export {
  SubFund as SubFundWithoutData,
};
