// @flow

import { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import OnBoard from "../../people/accounts";
import { modal, give as giveActions } from "../../../data/store";

import Layout from "./Layout";

const defaultArray = []; // empty array for usage as default in render

type IGive = {
  give: Object,
  dispatch: Function,
  data: Object,
};
class Give extends Component {
  props: IGive;

  componentWillMount() {
    this.updateData(this.props);

    const { savedAccount, transactionType } = this.props.give;
    if (transactionType === "savedPayment") {
      this.props.dispatch(giveActions.setProgress(2));
      return;
    }
    if (!savedAccount.id) return;

    this.props.dispatch(giveActions.setProgress(4));
  }

  componentWillReceiveProps(nextProps: Object) {
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

  onSubmit = (e: Event) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(giveActions.submit());
  };

  updateData = ({ data }: { data: Object }) => {
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
  };

  next = (e: Event) => {
    e.preventDefault();
    this.props.dispatch(giveActions.next());
  };

  goToStepOne = (e: Event) => {
    e.preventDefault();
    this.props.dispatch(giveActions.clearAccount());
    this.props.dispatch(giveActions.setState("default"));
    this.props.dispatch(giveActions.setProgress(1));
  };

  changeSavedAccount = (account: Object) => {
    this.props.dispatch(giveActions.setAccount(account));
  };

  back = (e: Event) => {
    e.preventDefault();
    if (this.props.give.step === 1) {
      this.props.dispatch(modal.hide());
      return;
    }

    this.props.dispatch(giveActions.previous());
  };

  goToAccounts = () => {
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
  };

  save = (...args: any) => {
    this.props.dispatch(giveActions.save(...args));
  };

  clear = (...args: any) => {
    this.props.dispatch(giveActions.clear(...args));
  };

  clearData = () => {
    this.props.dispatch(giveActions.clearData());
    this.props.dispatch(modal.hide());
  };

  render() {
    return (
      <Layout
        back={this.back}
        changeSavedAccount={this.changeSavedAccount}
        clear={this.clear}
        clearData={this.clearData}
        goToAccounts={this.goToAccounts}
        goToStepOne={this.goToStepOne}
        next={this.next}
        onSubmit={this.onSubmit}
        save={this.save}
        campuses={this.props.data.campuses}
        countries={this.props.data.countries}
        data={this.props.data}
        give={this.props.give}
        savedPayments={this.props.data.savedPayments || defaultArray}
        states={this.props.data.states}
      />
    );
  }
}

const CHECKOUT_QUERY = gql`
  query GetCheckoutData($state: Int!, $country: Int!) {
    states: definedValues(id: $state, all: true) {
      name: description
      value
      id
      _id
    }
    countries: definedValues(id: $country, all: true) {
      name: description
      value
      id
      _id
    }
    person: currentPerson {
      id
      firstName
      nickName
      lastName
      email
      campus {
        name
        id: entityId
      }
      home {
        id
        street1
        street2
        city
        state
        zip
        country
      }
    }
    savedPayments {
      name
      id: entityId
      date
      payment {
        accountNumber
        paymentType
      }
    }
    campuses {
      name
      id: entityId
    }
  }
`;

const withCheckout = graphql(CHECKOUT_QUERY, {
  options: { variables: { state: 28, country: 45 } },
  props: ({ data, data: { campuses, countries, states } }) => ({
    data: {
      ...data,
      campuses: campuses
        ? campuses.map(x => ({ label: x.name, value: x.id }))
        : defaultArray,
      countries: countries
        ? countries.map(x => ({ label: x.name, value: x.value }))
        : defaultArray,
      states: states
        ? states.map(x => ({ label: x.name, value: x.value }))
        : defaultArray,
    },
  }),
});

// We only care about the give state
const mapStateToProps = state => ({
  give: state.give,
});

export default withCheckout(connect(mapStateToProps)(Give));

export { Give as GiveWithoutData };
