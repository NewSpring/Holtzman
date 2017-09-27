/* eslint-disable react/no-multi-comp */
import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import { graphql, withApollo } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import { Loading, Error as Err } from "../../@primitives/UI/states";
import accountsActions from "../../../data/store/accounts";
import modalActions from "../../../data/store/modal";
// import headerActions from "../../store/header";

// import Loading from "./Loading"
import SignIn from "./Signin";
import Success from "./Success";
import ForgotPassword from "./ForgotPassword";
import SuccessCreate from "./SuccessCreate";

class Accounts extends Component {
  static propTypes = {
    setAccount: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    peopleWithoutAccountEmails: PropTypes.func.isRequired,
    data: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && nextProps.data.person) {
      this.props.setAccount(false);
      this.props.save(nextProps.data.person);
      this.props.peopleWithoutAccountEmails([nextProps.data.person]);
    }
  }

  render() {
    return <AccountsContainerWithData {...this.props} />;
  }
}

class AccountsContainer extends Component {
  // eslint-disable-line

  static propTypes = {
    account: PropTypes.object,
    accounts: PropTypes.object,
    authorize: PropTypes.func,
    completeAccount: PropTypes.func,
    hide: PropTypes.func,
    onFinished: PropTypes.func,
    onSignin: PropTypes.func,
    remember: PropTypes.func,
    reset: PropTypes.func,
    resetAccount: PropTypes.func,
    forgot: PropTypes.func,
    setAccount: PropTypes.func,
    save: PropTypes.func,
    clear: PropTypes.func,
    submit: PropTypes.func,
    location: PropTypes.object,
    client: PropTypes.object,
  };

  state = {
    loading: false,
    account: null,
  };

  componentWillMount() {
    // XXX this doesn't work because we are mapping dispatch to props
    // if (process.env.NATIVE) this.props.dispatch(headerActions.hide());

    if (typeof this.props.account !== "undefined") {
      this.setState({ account: this.props.account });
    }
  }

  componentWillReceiveProps(nextProps) {
    // if logged in, go to the next action
    if (!this.props.accounts.authorized && nextProps.accounts.authorized) {
      // let the UI show the welcome
      const user = Meteor.user();
      const isOld = user && user.profile && user.profile.lastLogin < new Date();

      if (nextProps.accounts.showWelcome && !isOld) return;

      const finish = () => {
        this.setState({ loading: false });
        // follow up action
        if (this.props.onFinished) return this.props.onFinished();

        // redirect after signin or register
        const whiteListed = url =>
          url.indexOf("https://alpha-rock.newspring.cc") === 0 ||
          url.indexOf("https://beta-rock.newspring.cc") === 0 ||
          url.indexOf("https://rock.newspring.cc") === 0;

        /* eslint-disable camelcase */
        const { redirect, return_person_guid } = this.props.location.query;
        if (redirect) {
          if (typeof return_person_guid !== "undefined" && whiteListed(redirect)) {
            nextProps.client
              .query({
                query: gql`
                  {
                    currentPerson {
                      guid
                    }
                  }
                `,
                forceFetch: true,
              })
              .then(({ data }) => {
                window.location.href = `${redirect}&person_guid=${data.currentPerson.guid}`;
              });
          } else {
            window.location.href = redirect;
          }
        }
        /* eslint-enable camelcase */

        // close the modal
        this.props.hide();
        return null;
      };

      if (this.props.onSignin) {
        this.setState({ loading: true });
        this.props
          .onSignin()
          .then(finish)
          .catch(finish);
      }

      finish();
    }
  }

  componentDidUpdate() {
    const { reset } = this.props;

    if (Object.keys(this.props.accounts.errors).length) {
      setTimeout(() => reset(), 2000);
    }
  }

  componentWillUnmount() {
    // XXX this doesn't work because we are mapping dispatch to props
    // if (process.env.NATIVE) this.props.dispatch(headerActions.show());
  }

  setAccountWrapper = bool => {
    this.setState({ account: null });
    this.props.setAccount(bool);
  };

  goBack = e => {
    e.preventDefault();
    if (typeof window !== "undefined" && window != null) {
      window.history.back();
    }
  };

  goSignIn = e => {
    if (e) e.preventDefault();
    this.props.remember();
  };

  goBackToDefaultOnBoard = e => {
    if (e) e.preventDefault();
    this.props.resetAccount();
  };

  goForgotPassword = e => {
    if (e) e.preventDefault();
    this.props.forgot();
  };

  signout = e => {
    if (e) e.preventDefault();
    Meteor.logout();
    this.props.authorize(false);
  };

  render() {
    const {
      data,
      errors,
      success,
      forgot,
      authorized,
      person,
      showWelcome,
      alternateAccounts,
      peopleWithoutAccountEmails,
      resettingAccount,
    } = this.props.accounts;

    let { state } = this.props.accounts;

    if (this.state.loading) state = "loading";
    let account = this.props.accounts.account;

    if (this.state.account != null) account = this.state.account;

    if (Object.keys(errors).length) {
      let primaryError;
      /* eslint-disable */
      for (const error in errors) {
        primaryError = errors[error];
        break;
      }
      /* eslint-enable */
      return <Err msg="There was an error" error={primaryError} />;
    }

    if (state === "loading") {
      const msg = account ? "Signing you in..." : "Creating your account...";
      return <Loading msg={msg} />;
    }

    if (forgot) {
      return (
        <ForgotPassword
          save={this.props.save}
          clear={this.props.clear}
          email={data.email}
          errors={errors}
          back={this.goSignIn}
          submit={this.props.submit}
        />
      );
    }

    if (authorized && showWelcome) {
      return <Success person={person} onExit={this.props.hide} />;
    }

    if (data.personId && !authorized && resettingAccount) {
      let email = data.email;
      for (const p of peopleWithoutAccountEmails) {
        if (p.id === data.personId) {
          email = p.email;
          break;
        }
      }
      return <SuccessCreate email={email} goBack={this.goBackToDefaultOnBoard} />;
    }

    return (
      <SignIn
        save={this.props.save}
        clear={this.props.clear}
        data={data}
        errors={errors}
        account={account}
        state={state}
        submit={this.props.submit}
        success={success}
        back={this.goBack}
        completeAccount={this.props.completeAccount}
        forgot={this.goForgotPassword}
        setAccount={this.setAccountWrapper}
        alternateAccounts={alternateAccounts}
        peopleWithoutAccountEmails={peopleWithoutAccountEmails}
      />
    );
  }
}

const mapDispatchToProps = { ...accountsActions, ...modalActions };

const PERSON_QUERY = gql`
  query GetPersonByGuid($guid: ID) {
    person(guid: $guid) {
      firstName
      lastName
      email
      photo
      id: entityId
      personId: entityId
    }
  }
`;

const withPerson = graphql(PERSON_QUERY, {
  options: ownProps => ({
    ssr: false,
    variables: {
      guid: ownProps.location && ownProps.location.query && ownProps.location.query.guid,
    },
  }),
});

const AccountsContainerWithData = withApollo(
  connect(
    state => ({
      accounts: state.accounts,
    }),
    mapDispatchToProps,
  )(AccountsContainer),
);

export default withPerson(
  connect(
    state => ({
      location: state.routing.location,
    }),
    mapDispatchToProps,
  )(Accounts),
);

export { AccountsContainer, Accounts };
