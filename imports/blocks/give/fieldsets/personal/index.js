import { Component, PropTypes } from "react";
import Layout from "./Layout";
import Validate from "../../../../util/validate";

export default class Personal extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    campuses: PropTypes.array.isRequired,
    header: PropTypes.string,
    save: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
  }

  firstName = (value) => {
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

  isEmail = (value) => {
    const isValid = Validate.isEmail(value);

    if (!isValid) {
      this.props.clear("email");
    } else {
      this.props.save({ personal: { email: value } });
    }

    return isValid;
  }

  lastName = (value) => {
    if (!value.length) {
      this.props.clear("lastName");
    } else {
      this.props.save({ personal: { lastName: value } });
    }

    return true;
  }

  campus = (value) => {
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
