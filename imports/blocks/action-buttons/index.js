import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import {
  modal,
  accounts as accountsActions,
  nav as navActions,
  give as giveActions,
} from "../../store";

import OnBoard from "../accounts";
import Give from "../give";
import ChangePayments from "../change-payments";

import Layout from "./Layout";

const SAVED_ACCTS_QUERY = gql`
  query GetSavedPaymentAccounts($cache: Boolean) {
    savedPayments(cache: $cache) {
      name, id: entityId, date,
      payment { accountNumber, paymentType }
    }
  }
`;

// XXX remove cache: false when heighliner caching is tested
const withSavedPayments = graphql(SAVED_ACCTS_QUERY, {
  name: "savedPayments",
  options: () => ({
    variables: {
      cache: false,
    },
    // XXX make redux `accounts.authorized` work mo betta
    // skip: !ownProps.authorized,
    forceFetch: true,
  }),
});

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const mapStateToProps = (store) => ({
  authorized: store.accounts.authorized,
  savedAccount: store.give.savedAccount,
});

@connect(mapStateToProps)
@withSavedPayments
export default class GiveNow extends Component {

  static propTypes = {
    authorized: PropTypes.bool,
    classes: PropTypes.array, // eslint-disable-line
    dataId: PropTypes.string,
    disabled: PropTypes.bool,
    disabledGuest: PropTypes.bool,
    dispatch: PropTypes.func,
    hideCard: PropTypes.bool,
    onClick: PropTypes.func,
    savedAccount: PropTypes.object, // eslint-disable-line
    savedPayments: PropTypes.object, // eslint-disable-line
    style: PropTypes.object, // eslint-disable-line
    text: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
  }

  state = {
    paymentDetails: false,
  }

  onClick = (e) => {
    let keepGoing = true;
    if (this.props.onClick) {
      keepGoing = this.props.onClick(e);
    }

    if (!keepGoing) {
      return;
    }

    this.props.dispatch(giveActions.setTransactionType("default"));

    if (this.props.savedPayments.savedPayments) {
      // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const details = this.getAccount();
      this.props.dispatch(giveActions.setAccount(details));
    }

    if (Meteor.userId() && !this.props.disabled) {
      this.props.dispatch(modal.render(Give));
    } else if (!Meteor.userId()) {
      this.props.dispatch(modal.render(OnBoard, {
        onSignin: this.getPaymentDetailsAfterLogin,
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

    return _.sortBy(savedPayments, "date")[savedPayments.length - 1];
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

  changePayments = (e) => {
    e.preventDefault();

    this.props.dispatch(modal.render(ChangePayments, {
      // onFinished: () => {},
      savedAccounts: this.props.savedPayments.savedPayments,
      currentAccount: this.getAccount(),
    }));
  }

  renderAfterLogin = () => {
    if (this.props.disabled) return this.props.dispatch(modal.hide());
    this.props.dispatch(modal.render(Give));
    return null;
  }

  render() {
    return (
      <Layout
        {...this.props}
        onClick={this.onClick}
        getAccount={this.getAccount}
        giveAsGuest={this.giveAsGuest}
        register={this.register}
        changePayments={this.changePayments}
        renderAfterLogin={this.renderAfterLogin}
        savedPayments={this.props.savedPayments.savedPayments}
      />
    );
  }
}
