
// @flow

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import SavedPaymentCard from "../../../components/cards/cards.SavedPayment";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

const SavedPaymentsButton = () =>
  <SmallButton
    text="Add Account"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />;

const PAYMENTS_QUERY = gql`
  query savedPayments {
    savedPayments{
      id
      name
      payment {
        accountNumber
        paymentType
      }
    }
  }
`;
const withSavedPaymentsData = graphql(PAYMENTS_QUERY, {
  name: "payments",
});

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
    if (!this.props.payments || !this.props.payments.savedPayments) return null;
    return (
      <div>
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

export default withRouter(withSavedPaymentsData(SavedPaymentsList));
