import { Component, PropTypes } from "react"
import { connect as ApolloConnect } from "react-apollo";
import { connect } from "react-redux";
import gql from "apollo-client/gql";

import { Loading, Error as Err } from "../../components/states"
import accountsActions from "../../store/accounts"
import modalActions from "../../store/modal"
import headerActions from "../../store/header"

// import Loading from "./Loading"
import SignIn from "./Signin"
import Success from "./Success"
import ForgotPassword from "./ForgotPassword"
import SuccessCreate from "./SuccessCreate"

const mapDispatchToProps = {...accountsActions, ...modalActions};
const mapQueriesToProps = ({ state }) => ({
  data: {
    query: gql`
      query GetPersonByGuid($guid:ID) {
        person(guid:$guid) {
          firstName
          lastName
          email
          photo
          id: entityId
          personId: entityId
        }
      }
    `,
    variables: {
      guid: state.routing.location && state.routing.location.query && state.routing.location.query.guid,
    },
  }
})

@ApolloConnect({ mapQueriesToProps, mapDispatchToProps })
export default class AccountsWithData extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && nextProps.data.person) {
      this.props.setAccount(false);
      this.props.save(nextProps.data.person);
      this.props.peopleWithoutAccountEmails([nextProps.data.person]);
    }
  }

  render() {
    return <AccountsContainer {...this.props} />
  }
}

// We only care about the accounts state
const mapStateToProps = (state) => ({ accounts: state.accounts });
@connect(mapStateToProps, mapDispatchToProps)
class AccountsContainer extends Component {

  static propTypes = {
    back: PropTypes.func,
    onFinished: PropTypes.func
  }

  state = {
    loading: false,
    account: null,
  }

  componentWillMount(){
    if (process.env.NATIVE) {
      headerActions.hide();
    }

    if (typeof this.props.account != "undefined") {
      this.setState({
        account: this.props.account,
      })
    }
  }

  componentWillUnmount() {
    if (process.env.NATIVE) {
      headerActions.show();
    }
  }

  componentWillReceiveProps(nextProps) {

    // if logged in, go to the next action
    if (!this.props.accounts.authorized && nextProps.accounts.authorized) {
      // let the UI show the welcome
      let user = Meteor.user()
      let isOld = user && user.profile && user.profile.lastLogin < new Date()

      if (nextProps.accounts.showWelcome  && !isOld) {
        return
      }

      const finish = () => {
        this.setState({
          loading: false,
        });
        // follow up action
        if (this.props.onFinished) {
          return this.props.onFinished()
        }

        // close the modal
        this.props.hide()
      }

      if (this.props.onSignin) {
        this.setState({
          loading: true,
        })

        return this.props.onSignin()
          .then(finish)
          .catch(finish);
      }

      finish();

    }
  }

  componentDidUpdate(prevProps, prevState){
    const { reset } = this.props

    if (Object.keys(this.props.accounts.errors).length) {
      setTimeout(() => {
        reset()
      }, 2000)
    }

  }

  goBack = (e) => {
    e.preventDefault();
    if (typeof window != "undefined" && window != null) {
      window.history.back()
    }
  }

  goSignIn = (e) => {
    e && e.preventDefault();
    this.props.remember()
  }

  goBackToDefaultOnBoard = (e) => {
    e && e.preventDefault();
    this.props.resetAccount()
  }

  goForgotPassword = (e) => {
    e && e.preventDefault();
    this.props.forgot()
  }

  signout = (e) => {
    e.preventDefault()
    Meteor.logout()
    this.props.authorize(false)
  }

  setAccountWrapper = (bool) => {
    this.setState({ account: null });
    this.props.setAccount(bool)
  }

  render () {

    let {
      data,
      errors,
      state,
      success,
      forgot,
      authorized,
      person,
      showWelcome,
      alternateAccounts,
      peopleWithoutAccountEmails,
      resettingAccount,
    } = this.props.accounts

    if (this.state.loading) state = "loading";
    let account = this.props.accounts.account

    if (this.state.account != null) account = this.state.account;

    if (Object.keys(errors).length) {
      let primaryError;
      for (let error in errors) {
        primaryError = errors[error]
        break
      }
      return <Err msg="There was an error" error={primaryError} />
    }

    if (state === "loading") {
      let msg = account ? "Signing you in..." : "Creating your account..."
      return <Loading msg={msg} />
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
      )
    }

    if (authorized && showWelcome) {
      return (
        <Success
          person={person}
          onExit={this.props.hide}
        />
      )
    }

    if (data.personId && !authorized && resettingAccount) {
      let email = data.email
      for (let p of peopleWithoutAccountEmails) {
        if (p.id === data.personId) {
          email = p.email
          break;
        }
      }
      return (
        <SuccessCreate
          email={email}
          goBack={this.goBackToDefaultOnBoard}
        />
      )
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
    )
  }
}
