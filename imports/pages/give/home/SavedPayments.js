
// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingCard from "../../../components/@primitives/UI/loading/ActivityCard";
import SectionHeader from "../../../components/@primitives/UI/section-header";
import SmallButton from "../../../components/@primitives/UI/buttons/SmallButton";
import { modal } from "../../../data/store";

import giveActions from "../../../data/store/give";
import Give from "../../../components/giving/checkout-views";

import SavedPaymentWithAction from "./withRemoveSavedPayment";

type ISavedPaymentsList = {
  payments: Object,
  location: Object,
  dispatch: Function,
};

export class SavedPaymentsList extends Component {

  props: ISavedPaymentsList;
  hasScrolled: boolean;
  element: Object;

  componentDidUpdate() {
    if (
      this.props.location.hash === "#saved-payments" &&
      !this.props.payments.loading &&
      !this.hasScrolled
    ) {
      this.hasScrolled = true;
      this.element.scrollIntoView();
    }
  }

  openModal = () => {
    // clear out existing data
    this.props.dispatch(giveActions.clearData());
    // set transaction type
    this.props.dispatch(giveActions.setTransactionType("savedPayment"));
    this.props.dispatch(modal.render(Give, null));
  }

  // XXX turn this back on once NMI fixes their bug
  // they turned off the feature to saved payments which we were using
  // without a second confirmatin during the next gift
  // this doesn't make sense
  // ~ Angry James
  SavedPaymentsButton = () =>
    <SmallButton
      text="Add Account"
      onClick={this.openModal}
      className="btn--dark-tertiary flush"
    />;

  renderPayments(payments: Object) {
    if (!Array.isArray(payments)) return null;
    return payments.map(payment =>
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
      <div className={wrapper} ref={e => { this.element = e; }}>
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

export const map = ({ routing }: { routing: Object }) => ({
  location: routing.location,
});
export default connect(map)(SavedPaymentsList);
