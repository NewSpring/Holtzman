import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import Controls from "../../components/controls";
import Forms from "../../components/forms";

import OnBoard from "../../blocks/accounts";
import { modal, give as giveActions } from "../../store";

import { Personal, Payment, Billing, Confirm } from "./fieldsets";
import Loading from "./Loading";
import Err from "./Err";
import Success from "./Success";

const CHECKOUT_QUERY = gql`
  query GetCheckoutData($state: Int!, $country: Int!) {
    states: definedValues(id: $state, all: true) {
      name: description, value, id, _id
    }
    countries: definedValues(id: $country, all: true) {
      name: description, value, id, _id
    }
    person: currentPerson {
      firstName
      nickName
      lastName
      email
      campus { name, id: entityId }
      home { street1, street2, city, state, zip, country }
    }
    savedPayments {
      name, id: entityId, date,
      payment { accountNumber, paymentType }
    }
    campuses { name, id: entityId }
  }
`;

const withCheckout = graphql(CHECKOUT_QUERY, {
  options: { variables: { state: 28, country: 45 } },
});

const defaultArray = []; // empty array for usage as default in render
// We only care about the give state
const mapStateToProps = (state) => ({
  give: state.give,
});

@connect(mapStateToProps)
@withCheckout
export default class Give extends Component {

  static propTypes = {
    give: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.updateData(this.props);

    const { savedAccount } = this.props.give;
    if (!savedAccount.id) return;

    this.props.dispatch(giveActions.setProgress(4));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && this.props.data.loading) {
      this.updateData(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.props.give.state !== "default") {
      this.props.dispatch(giveActions.clearData());
      this.props.dispatch(giveActions.clearSchedules());
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(giveActions.submit());
  }

  updateData = ({ data }) => {
    if (data.loading || !data.person) return;

    const { person } = data;

    let { campus, home } = person;

    if (!campus) {
      campus = {};
    }

    if (!home) {
      home = {};
    }

    const mappedPerson = {
      personal: {
        firstName: person.nickName || person.firstName,
        lastName: person.lastName,
        email: person.email,
        campus: campus.name,
        campusId: campus.id,
      },
      billing: {
        streetAddress: home.street1,
        streetAddress2: home.street2,
        city: home.city,
        state: home.state,
        zip: home.zip,
        country: home.country,
      },
    };

    this.props.dispatch(giveActions.save(mappedPerson));
  }

  next = (e) => {
    e.preventDefault();
    this.props.dispatch(giveActions.next());
  }

  goToStepOne = (e) => {
    e.preventDefault();
    this.props.dispatch(giveActions.clearAccount());
    this.props.dispatch(giveActions.setState("default"));
    this.props.dispatch(giveActions.setProgress(1));
  }

  changeSavedAccount = (account) => {
    this.props.dispatch(giveActions.setAccount(account));
  }

  back = (e) => {
    e.preventDefault();
    if (this.props.give.step === 1) {
      this.props.dispatch(modal.hide());
      return;
    }

    this.props.dispatch(giveActions.previous());
  }

  monentize = (amount, fixed) => {
    let value = typeof amount === "number" ? `${amount}` : amount;

    if (!value.length) {
      return "$0.00";
    }

    value = value.replace(/[^\d.-]/g, "");

    const decimals = value.split(".")[1];
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2);
      value = String(value);
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${value}`;
  }

  goToaccounts = () => {
    const { data } = this.props.give;

    const props = {
      coverHeader: true,
      account: false,
      data: {
        email: data.personal.email,
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        terms: true,
      },
    };
    this.props.dispatch(modal.render(OnBoard, props));
  }

  render() {
    const {
      data,
      url,
      errors,
      step,
      transactions,
      schedules,
      total,
      savedAccount,
      state,
      transactionType,
      scheduleToRecover,
    } = this.props.give;

    let { campuses, states, countries } = this.props.data;

    if (!campuses) {
      campuses = defaultArray;
    }

    campuses = campuses.map((x) => ({ label: x.name, value: x.id }));

    if (!states) {
      states = defaultArray;
    }

    states = states.map((x) => ({ label: x.name, value: x.value }));

    if (!countries) {
      countries = defaultArray;
    }

    countries = countries.map((x) => ({ label: x.name, value: x.value }));

    const save = (...args) => { this.props.dispatch(giveActions.save(...args)); };
    const clear = (...args) => { this.props.dispatch(giveActions.clear(...args)); };
    const clearData = () => {
      this.props.dispatch(giveActions.clearData());
      this.props.dispatch(modal.hide());
    };
    switch (state) {
      case "loading":
        this.copiedSchedules = { ...schedules };
        return <Loading msg="We're Processing Your Contribution" />;
      case "error":
        return <Err msg={errors[Object.keys(errors)[0]].error} goToStepOne={this.goToStepOne} />;
      case "success":
        return (<Success
          total={this.monentize(total.toFixed(2))}
          email={data.personal.email}
          guest={transactionType === "guest"}
          onClick={this.goToaccounts}
          schedules={this.copiedSchedules}
        />);
      // eslint-disable-next-line
      default:
        let Step;
        switch (step) {
          case 4:
            Step = Confirm;
            break;
          case 3:
            Step = Payment;
            break;
          case 2:
            Step = Billing;
            break;
          default:
            Step = Personal;
        }

        return (
          <Forms.Form
            id="give"
            theme="hard"
            fieldsetTheme="flush soft-top scrollable soft-double-bottom"
            ref="form"
            method="POST"
            submit={this.onSubmit}
          >

            <Step
              data={data}
              url={url}
              savedAccount={savedAccount}
              transactions={transactions}
              transactionType={transactionType}
              save={save}
              errors={errors}
              clear={clear}
              clearData={clearData}
              next={this.next}
              back={this.back}
              ref="inputs"
              total={total}
              campuses={campuses}
              states={states}
              countries={countries}
              schedules={schedules}
              goToStepOne={this.goToStepOne}
              savedAccounts={this.props.data.savedPayments || defaultArray} // XXX perf
              changeSavedAccount={this.changeSavedAccount}
              scheduleToRecover={scheduleToRecover}
            >
              <Controls.Progress
                steps={4}
                active={step}
              />
            </Step>
          </Forms.Form>
        );
    }
  }
}
