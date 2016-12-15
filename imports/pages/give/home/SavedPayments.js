
// @flow

import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import SavedPaymentCard from "../../../components/cards/cards.SavedPayment";
import LoadingCard from "../../../components/loading/ActivityCard";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

const SavedPaymentsButton = () =>
  <SmallButton
    text="Add Account"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />;


type ISavedPaymentsList = {
  payments: Object,
  router: Object,
};

export class SavedPaymentsList extends Component {
  props: ISavedPaymentsList;

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
                We can’t wait for you to take your next step in giving. After you have given your first contribution, you’ll see your activity here.
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
          link={<SavedPaymentsButton />}
        />
        <div className="grid">
          {this.renderPayments(this.props.payments.savedPayments)}
        </div>
      </div>
    );
  }
}

export default withRouter(SavedPaymentsList);
