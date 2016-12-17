
// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingCard from "../../../components/loading/ActivityCard";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";
import { modal } from "../../../store/";

import giveActions from "../../../store/give";
import Give from "../../../blocks/give";

import SavedPaymentWithAction from "./withRemoveSavedPayment";

type ISavedPaymentsList = {
  payments: Object,
  dispatch: Function,
};

export class SavedPaymentsList extends Component {
  props: ISavedPaymentsList;

  openModal = () => {
    // set transaction type
    this.props.dispatch(giveActions.setTransactionType("savedPayment"));
    this.props.dispatch(modal.render(Give, null));
  }

  SavedPaymentsButton = () =>
    <SmallButton
      text="Add Account"
      onClick={this.openModal}
      className="btn--dark-tertiary flush"
    />;

  renderPayments(payments: Object) {
    if (!Array.isArray(payments)) return null;
    return payments.map((payment) =>
      <SavedPaymentWithAction payment={payment} key={payment.id} />
    );
  }

  render() {
    const wrapper = "soft-half-sides soft-double-sides@lap-and-up";

    if (!this.props.payments) return null;

    if (this.props.payments.loading) {
      return (
        <div className={wrapper}>
          <LoadingCard />
        </div>
      );
    }

    if (!this.props.payments || !this.props.payments.savedPayments) {
      return (
        <div className={wrapper}>
          <SectionHeader title="Saved Accounts" link={<this.SavedPaymentsButton />} />
          <div className="card">
            <div className="card__item soft">
              <h4 className="text-dark-primary">
                Adding a saved account makes giving even easier!
              </h4>
              <p>
                We can’t wait for you to take your next step in giving.
                After you have given your first contribution, you’ll see your activity here.
              </p>
              <button
                onClick={this.openModal}
                className="btn one-whole@handheld flush-bottom"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={wrapper}>
        <SectionHeader
          title="Saved Accounts"
          link={<this.SavedPaymentsButton />}
        />
        <div className="grid">
          {this.renderPayments(this.props.payments.savedPayments)}
        </div>
      </div>
    );
  }
}

export default connect()(SavedPaymentsList);
