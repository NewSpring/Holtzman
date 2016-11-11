import { Component, PropTypes } from "react";

import Validate from "../../../../util/validate";

import Layout from "./Layout";

export default class Payment extends Component {

  static propTypes = {
    save: PropTypes.func,
    data: PropTypes.object,
    savedAccount: PropTypes.object,
    header: PropTypes.string,
    children: PropTypes.object,
    toggles: PropTypes.func,
    transactionType: PropTypes.string,
    schedules: PropTypes.object,
    back: PropTypes.func,
    next: PropTypes.func,
  }

  state = {
    save: true,
  }

  savePayment = () => {
    this.setState({ save: !this.state.save });

    if (this.state.save) {
      this.props.save({ payment: { name: null } });
    }
  }

  saveName = (value) => {
    if (value.length > 0) {
      this.props.save({ payment: { name: value } });
    }

    return (value.length > 0);
  }

  validate = (value, target) => {
    const { id } = target;

    let isValid = false;
    const notEmpty = (inputVal) => (inputVal.length > 0);
    const validationMap = {
      accountNumber: notEmpty,
      routingNumber: notEmpty,
      accountType: notEmpty,
      accountName: notEmpty,
      cardNumber: Validate.isCreditCard,
      expiration: notEmpty,
      ccv: Validate.isCCV,
    };

    isValid = validationMap[id](value);

    // special case for intial repaint
    if ((id === "cardNumber" || id === "routingNumber") && !value) {
      return true;
    }

    return isValid;
  }

  saveData = (value, target) => {
    const { id } = target;

    const isValid = this.validate(value, target);

    if (isValid) {
      this.props.save({ payment: { [id]: value } });
    }
  }

  // XXX move to layout, but changes to input are needed
  formatExp = (s, target) => {
    const save = (adjusted) => {
      this.saveData(adjusted, target);
      return adjusted;
    };

    let current = this.props.data.payment.expiration;
    if (!current) {
      current = "";
    }

    const str = `${s}`;

    if (str.length > 5) {
      return save(str.slice(0, 5));
    }

    const copy = str;
    const lastNumber = copy.slice(-1);
    const currentLastNumber = current.slice(-1);

    if (lastNumber === "/" && str.length === 1) {
      return save(`0${str}/`);
    }

    if (lastNumber === "/" && str.length === 2 && currentLastNumber !== "/") {
      return save(`${str}/`);
    }

    if (str.length === 2 && lastNumber !== "/" && currentLastNumber !== "/") {
      return save(`${str}/`);
    }

    if (str.length === 4 && (lastNumber === "/")) {
      return save(str.slice(0, 3));
    }

    return save(str);
  }

  toggle = () => {
    let type = "ach";
    if (this.props.data.payment.type === type) {
      type = "cc";
    }

    this.props.save({ payment: { type } });
  }

  render() {
    return (
      <Layout
        formatExp={this.formatExp}
        saveData={this.saveData}
        saveName={this.saveName}
        savePayment={this.savePayment}
        toggle={this.toggle}
        validate={this.validate}

        shouldSaveState={this.state.save}

        back={this.props.back}
        header={this.props.header}
        next={this.props.next}
        payment={this.props.data.payment}
        savedAccount={this.props.savedAccount}
        schedules={this.props.schedules}
        toggles={this.props.toggles}
        transactionType={this.props.transactionType}
      >
        {this.props.children}
      </Layout>
    );
  }
}
