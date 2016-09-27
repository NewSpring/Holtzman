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

import AccountType from "../../components/accountType";

import OnBoard from "../accounts";
import Give from "../give";
import ChangePayments from "../change-payments";

import {
  PrimaryButton,
  SecondaryButton,
  Guest as TertiaryButton,
} from "./Buttons";

const SAVED_ACCTS_QUERY = gql`
  query GetSavedPaymentAccounts {
    savedPayments(cache: false) {
      name, id: entityId, date,
      payment { accountNumber, paymentType }
    }
  }
`;

// XXX remove cache: false when heighliner caching is tested
const withSavedPayments = graphql(SAVED_ACCTS_QUERY, {
  options: ownProps => ({
    name: "savedPayments",
    variables: {
      // even though this is unused, we include it to trigger a recal when a person
      // logs in or logs out
      authorized: ownProps.authorized,
    },
    forceFetch: true,
  }),
});

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const mapStateToProps = store => ({
  authorized: store.accounts.authorized,
  savedAccount: store.give.savedAccount,
});

@connect({ mapStateToProps })
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

  buttonClasses = () => {
    let classes = ["btn"];

    if (this.props.savedPayments.savedPayments) {
      classes.push("has-card");
    }

    if (this.props.disabled && Meteor.userId()) {
      classes.push("btn--disabled");
    }

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
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

  buttonText = () => {
    let text = "Give Now";
    if (this.props.text) {
      text = this.props.text;
    }
    const { savedPayments } = this.props.savedPayments;
    if (savedPayments && savedPayments.length && !this.props.hideCard) {
      const details = this.getAccount();
      if (details && details.payment && details.payment.accountNumber) {
        let { accountNumber } = details.payment;
        accountNumber = accountNumber.slice(-4).trim();
        text = `Review Using ${accountNumber}`;
      }
    }

    if (!Meteor.userId()) text = "Sign In";

    return text;
  }

  icon = () => {
    if (this.props.savedPayments.savedPayments && !this.props.hideCard) {
      // const detail = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const detail = this.getAccount();
      if (detail.payment && detail.payment.paymentType === "ACH") {
        return (
          <AccountType width="30px" height="21px" type="Bank" />
        );
      } else if (detail.payment && detail.payment.paymentType) {
        return (
          <AccountType width="30px" height="21px" type={detail.payment.paymentType} />
        );
      }
    }
    return null;
  }

  renderAfterLogin = () => {
    if (this.props.disabled) return this.props.dispatch(modal.hide());
    this.props.dispatch(modal.render(Give));
    return null;
  }


  render() {
    try {
      return (
        <span>
          <PrimaryButton
            classes={this.props.theme || this.buttonClasses()}
            icon={this.icon()}
            text={this.buttonText()}
            onClick={this.onClick}
            value={this.props.value}
            style={this.props.style || {}}
            dataId={this.props.dataId}
          />
          {(() => {
            if (!this.props.authorized && !Meteor.userId()) {
              return (
                <SecondaryButton

                  onClick={this.register}
                />
              );
            }
            return null;
          })()}
          {(() => {
            if (!this.props.disabledGuest && !Meteor.userId()) {
              return (
                <TertiaryButton
                  disabled={this.props.disabled}
                  onClick={this.giveAsGuest}
                />
              );
            }
            return null;
          })()}

          {(() => {
            const { savedPayments } = this.props.savedPayments;
            if (savedPayments && savedPayments.length && !this.props.hideCard && Meteor.userId()) {
              return (
                <TertiaryButton
                  onClick={this.changePayments}
                  text={"Change payment account"}
                />
              );
            }
            return null;
          })()}

        </span>

      );
    } catch (e) {
      return null;
    }
  }
}
