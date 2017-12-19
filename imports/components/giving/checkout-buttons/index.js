// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { sortBy } from "underscore";

import {
  modal,
  accounts as accountsActions,
  nav as navActions,
  give as giveActions,
} from "../../../data/store";

import OnBoard from "../../people/accounts";
import Give from "../checkout-views";
import ChangePayments from "../change-payments";

import Layout from "./Layout";

export const SAVED_ACCTS_QUERY = gql`
  query GetSavedPaymentAccounts($cache: Boolean) {
    savedPayments(cache: $cache) {
      name, id: entityId, date,
      payment { accountNumber, paymentType }
    }
  }
`;

// XXX remove cache: false when heighliner caching is tested
export const withSavedPayments = graphql(SAVED_ACCTS_QUERY, {
  name: "savedPayments",
  // skip: (ownProps) => !ownProps.authorized,
  options: () => ({
    variables: {
      cache: false,
    },
    // XXX make redux `accounts.authorized` work mo betta
    // skip: !ownProps.authorized,
    fetchPolicy: "network-only",
  }),
});

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/

type IStore = {
  accounts: Object;
  give: Object;
}

export const mapStateToProps = ({ accounts, give }: IStore) => ({
  authorized: accounts.authorized,
  savedAccount: give.savedAccount,
});

export const withState = connect(mapStateToProps);

type ICheckoutButtons = {
  authorized: boolean,
  classes: string,
  dataId: string,
  disabled: boolean,
  disabledGuest: boolean,
  dispatch: Function,
  hideCard: boolean,
  onClick: Function,
  savedAccount: Object,
  savedPayments: Object,
  style: Object,
  text: string,
  theme: string,
  value: string,
  refetch: Function,
};

export class CheckoutButton extends Component {

  props: ICheckoutButtons;

  static defaultProps = {
    savedPayments: {},
  }

  state = {
    paymentDetails: false,
  }

  onClick = (e: Event) => {
    let keepGoing = true;
    if (this.props.onClick) {
      keepGoing = this.props.onClick(e);
    }

    if (!keepGoing) {
      return;
    }

    this.props.dispatch(giveActions.setTransactionType("default"));

    if (this.props.savedPayments.savedPayments) {
      const details = this.getAccount();
      this.props.dispatch(giveActions.setAccount(details));
    }

    if (Meteor.userId() && !this.props.disabled) {
      this.props.dispatch(modal.render(Give));
    } else if (!Meteor.userId()) {
      this.props.dispatch(modal.render(OnBoard, {
        // XXX getPaymentDetailsAfterLogin doesn't exist
        // onSignin: this.getPaymentDetailsAfterLogin,
        onFinished: this.renderAfterLogin,
        coverHeader: true,
      }));

      this.props.dispatch(accountsActions.setAccount(true));
    }

    this.props.dispatch(navActions.setLevel("MODAL"));
  }

  getAccount = () => {
    const { savedAccount } = this.props;
    if (savedAccount && savedAccount.id) return savedAccount;

    if (!this.props.savedPayments) return {};

    const { savedPayments } = this.props.savedPayments;
    if (!savedPayments || !savedPayments.length) return {};

    return sortBy(savedPayments, "date")[savedPayments.length - 1];
  }

  giveAsGuest = () => {
    if (this.props.disabled) return;

    this.props.dispatch(giveActions.setTransactionType("guest"));
    this.props.dispatch(modal.render(Give));
    // this.props.dispatch(navActions.setLevel("MODAL"))
  }

  register = () => {
    this.props.dispatch(accountsActions.setAccount(false));
    this.props.dispatch(modal.render(OnBoard, {
      onFinished: this.renderAfterLogin,
      coverHeader: true,
    }));
    // this.props.dispatch(navActions.setLevel("MODAL"))
  }

  changePayments = (e: Event) => {
    e.preventDefault();

    this.props.dispatch(modal.render(ChangePayments, {
      // onFinished: () => {},
      savedAccounts: this.props.savedPayments.savedPayments,
      currentAccount: this.getAccount(),
    }));
  }

  renderAfterLogin = () => {
    if (this.props.disabled) return this.props.dispatch(modal.hide());
    // get the payment details before finishing payment
    this.props.savedPayments.refetch()
      .then(({ data }) => {
        if (data.savedPayments && data.savedPayments.length) {
          const details = sortBy(data.savedPayments, "date")[data.savedPayments.length - 1];
          this.props.dispatch(giveActions.setAccount(details));
        }
        this.props.dispatch(modal.render(Give));
      });
    return null;
  }

  render() {
    return (
      <Layout
        onClick={this.onClick}
        getAccount={this.getAccount}
        giveAsGuest={this.giveAsGuest}
        register={this.register}
        changePayments={this.changePayments}
        renderAfterLogin={this.renderAfterLogin}

        authorized={this.props.authorized}
        classes={this.props.classes}
        disabled={this.props.disabled}
        disabledGuest={this.props.disabledGuest}
        hideCard={this.props.hideCard}
        dataId={this.props.dataId}
        savedPayments={this.props.savedPayments.savedPayments}
        style={this.props.style}
        text={this.props.text}
        theme={this.props.theme}
        value={this.props.value}
      />
    );
  }
}

export default withState(withSavedPayments(CheckoutButton));
