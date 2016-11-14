// @flow

import { Component } from "react";
import Layout from "./Layout";
import Validate from "../../../../util/validate";

type IPersonal = {
  data: Object,
  campuses: Object[],
  header?: React$Element<any>,
  save: Function,
  clear: Function,
  next: Function,
  children?: React$Element<any>,
};

export default class Personal extends Component {
  props: IPersonal;

  firstName = (value: string): boolean => {
    if (!value.length) {
      this.props.clear("firstName");
    } else {
      this.props.save({
        personal: {
          firstName: value,
        },
      });
    }

    return true;
  }

  isEmail = (value: string): boolean => {
    const isValid = Validate.isEmail(value);

    if (!isValid) {
      this.props.clear("email");
    } else {
      this.props.save({ personal: { email: value } });
    }

    return isValid;
  }

  lastName = (value: string): boolean => {
    if (!value.length) {
      this.props.clear("lastName");
    } else {
      this.props.save({ personal: { lastName: value } });
    }

    return true;
  }

  campus = (value: string): boolean => {
    this.props.save({ personal: { campusId: value } });
    // save name for display
    for (const campus of this.props.campuses) {
      // eslint-disable-next-line
      if (`${campus.value}` !== value) continue;
      this.props.save({ personal: { campus: campus.label } });
    }
    return true;
  }


  render() {
    const { personal } = this.props.data;
    const { campuses = [] } = this.props;

    if (campuses.length === 0) {
      delete personal.campus;
      delete personal.campusId;
    }

    return (
      <Layout
        campus={this.campus}
        firstName={this.firstName}
        isEmail={this.isEmail}
        lastName={this.lastName}

        campuses={campuses}
        header={this.props.header}
        next={this.props.next}
        personal={personal}
      >
        {this.props.children}
      </Layout>
    );
  }
}
