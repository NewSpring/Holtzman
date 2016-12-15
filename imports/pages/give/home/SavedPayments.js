
// @flow

import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import SavedPaymentCard from "../../../components/cards/cards.SavedPayment";
import LoadingCard from "../../../components/loading/ActivityCard";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";
import { modal } from "../../../store/";

import giveActions from "../../../store/give";
import Give from "../../../blocks/give";


type ISavedPaymentsList = {
  payments: Object,
  router: Object,
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
      <SavedPaymentCard
        classes={"grid__item one-half@lap-wide-and-up"}
        key={`${payment.id}_${payment.name}`}
        payment={payment}
        onClick={() => {
          this.props.router.push(`/give/saved-payments/edit/${payment.id}`);
        }}
      />
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
          <SectionHeader title="Saved Accounts" link={<SavedPaymentsButton />} />
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
                onClick={() => alert("add function here")}
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

export default connect()(withRouter(SavedPaymentsList));
