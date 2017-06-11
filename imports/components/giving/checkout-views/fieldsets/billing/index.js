// @flow

import { Component } from "react";
import Layout from "./Layout";

type IBilling = {
  data: Object,
  children?: React$Element<any>,
  save: Function,
  clear: Function,
  back: Function,
  next: Function,
  header?: React$Element<any>,
  states: Object[],
  countries: Object[],
  transactionType: string,
};

export default class Billing extends Component {
  props: IBilling;

  streetAddress = (value: string): boolean => {
    if (!value.length) {
      this.props.clear("billing", "streetAddress");
    } else {
      this.props.save({ billing: { streetAddress: value } });
    }

    return true;
  }

  streetAddress2 = (value: string): boolean => {
    this.props.save({ billing: { streetAddress2: value } });
    return true;
  }

  saveState = (value: string): boolean => {
    // we can't require city for international giving

    if (!value.length) {
      this.props.clear("billing", "state");
    } else {
      this.props.save({ billing: { state: value } });
    }

    return true;
  }

  saveCountry = (value: string): boolean => {
    if (!value.length) {
      this.props.clear("billing", "country");
    } else {
      this.props.save({ billing: { country: value } });
    }

    return true;
  }

  city = (value: string): boolean => {
    if (!value.length) {
      this.props.clear("billing", "city");
    } else {
      this.props.save({ billing: { city: value } });
    }

    return true;
  }

  zip = (value: string):boolean => {
    // we can't require zip for international giving
    if (!value.length) {
      this.props.clear("billing", "zip");
    } else {
      this.props.save({ billing: { zip: value } });
    }

    return true;
  }

  render() {
    return (
      <Layout
        city={this.city}
        saveCountry={this.saveCountry}
        saveState={this.saveState}
        streetAddress={this.streetAddress}
        streetAddress2={this.streetAddress2}
        zip={this.zip}

        back={this.props.back}
        billing={this.props.data.billing}
        countries={this.props.countries}
        header={this.props.header}
        next={this.props.next}
        states={this.props.states}
        transactionType={this.props.transactionType}
      >
        {this.props.children}
      </Layout>
    );
  }
}
