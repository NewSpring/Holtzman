import { Component, PropTypes } from "react";
import Layout from "./Layout";

export default class Billing extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    header: PropTypes.string,
    states: PropTypes.array,
    countries: PropTypes.array,
  }

  streetAddress = (value) => {
    if (!value.length) {
      this.props.clear("billing", "streetAddress");
    } else {
      this.props.save({ billing: { streetAddress: value } });
    }

    return true;
  }

  streetAddress2 = (value) => {
    this.props.save({ billing: { streetAddress2: value } });
    return true;
  }

  saveState = (value) => {
    // we can't require city for international giving

    if (!value.length) {
      this.props.clear("billing", "state");
    } else {
      this.props.save({ billing: { state: value } });
    }

    return true;
  }

  saveCountry = (value) => {
    if (!value.length) {
      this.props.clear("billing", "country");
    } else {
      this.props.save({ billing: { country: value } });
    }

    return true;
  }

  city = (value) => {
    if (!value.length) {
      this.props.clear("billing", "city");
    } else {
      this.props.save({ billing: { city: value } });
    }

    return true;
  }

  zip = (value) => {
    // we can't require zip for international giving
    if (!value.length) {
      this.props.clear("billing", "zip");
    } else {
      this.props.save({ billing: { zip: value } });
    }

    return true;
  }

  render() {
    const { billing } = this.props.data;
    const { states, countries } = this.props;
    return (
      <Layout
        city={this.city}
        saveCountry={this.saveCountry}
        saveState={this.saveState}
        streetAddress={this.streetAddress}
        streetAddress2={this.streetAddress2}
        zip={this.zip}

        back={this.props.back}
        billing={billing}
        countries={countries}
        header={this.props.header}
        next={this.props.next}
        states={states}
      >
        {this.props.children}
      </Layout>
    );
  }
}
