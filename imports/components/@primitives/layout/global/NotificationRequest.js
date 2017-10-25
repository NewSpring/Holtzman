// @flow
import { Component } from "react";
import { graphql } from "react-apollo";
import moment from "moment";
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";
import gql from "graphql-tag";

import { modal } from "../../../../data/store";
import { GraphQL } from "../../../../data/graphql";

// import isIOS from "../../../../util/isIOS";

// XXX Query is duplicated within profile section
const GET_PERSON_QUERY = gql`
  query GetPerson {
    person: currentPerson(cache: false) {
      firstName
      nickName
    }
  }
`;

const withPerson = graphql(GET_PERSON_QUERY, {
  // XXX authorized is still not returning well enough
  // skip: (ownProps) => !Meteor.userId()  !ownProps.authorized,
});

export const SAVE_DEVICE_REGISTRATION_ID = gql`
  mutation SaveDeviceRegistrationId($registrationId: String!, $uuid: String!) {
    saveDeviceRegistrationId(registrationId: $registrationId, uuid: $uuid) {
      error
      code
      success
    }
  }
`;

export const withSaveDeviceRegistrationId = graphql(SAVE_DEVICE_REGISTRATION_ID, {
  props: ({ mutate }) => ({
    saveDeviceRegistrationId: registrationId =>
      mutate({
        // $FlowMeteor
        variables: { registrationId, uuid: device.uuid },
      }),
  }),
});

export const UPDATE_ATTRIBUTE_MUTATION = gql`
  mutation updatePersonAttribute($key: String!, $value: String!) {
    setPersonAttribute(key: $key, value: $value) {
      code
      error
      success
    }
  }
`;

export const withUpdatePerson = graphql(UPDATE_ATTRIBUTE_MUTATION, {
  props: ({ mutate }) => ({
    updateNotificationIgnoreDate: value =>
      mutate({
        variables: { key: "NotificationIgnoreDate", value },
      }),
  }),
});

if (Meteor.isCordova) {
  document.addEventListener(
    "deviceready",
    () => {
      // $FlowMeteor
      FCMPlugin.onTokenRefresh(token => {
        if (!token) return;
        GraphQL.mutate({
          mutation: SAVE_DEVICE_REGISTRATION_ID,
          // $FlowMeteor
          variables: { registrationId: token, uuid: device.uuid },
        });
      });
    },
    false,
  );
}

type IResult = {
  person: {
    firstName: string, // eslint-disable-line
    nickName: string, // eslint-disable-line
  },
};

type IProps = {
  dispatch: (obj: mixed) => void,
  updateNotificationIgnoreDate: (value: string) => Promise<any>,
  data: IResult,
  saveDeviceRegistrationId: (id: string) => Promise<any>,
};

class NotificationPrompt extends Component {
  props: IProps;

  prompt = () => {
    // $FlowMeteor
    FCMPlugin.ready(() => {
      FCMPlugin.subscribeToTopic("newspring");
      FCMPlugin.getToken(token => {
        if (!token) return;
        this.props.saveDeviceRegistrationId(token).then(
          ({ data: { saveDeviceRegistrationId: { success } } }) =>
            // $FlowMeteor
            success && NativeStorage.setItem("pushNotifications", true, console.log, console.error), // eslint-disable-line
        );
      });
      this.close();
    });
  };

  notifyLater = () => {
    this.props.updateNotificationIgnoreDate(
      moment()
        .add(3, "months")
        .toISOString(),
    );
    this.close();
  };

  close = () => {
    this.props.dispatch(modal.hide());
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <h4 className="soft-top">
          Hi {!data.person ? null : data.person.nickName || data.person.firstName}
        </h4>
        <p>Do you want us to notify you when new information is available?</p>
        <button className="btn one-whole" onClick={this.prompt}>
          Notify Me
        </button>
        <button className="one-whole btn--small btn--dark-tertiary" onClick={this.notifyLater}>
          No Thanks
        </button>
      </div>
    );
  }
}

export default connect()(
  withSaveDeviceRegistrationId(withUpdatePerson(withPerson(NotificationPrompt))),
);
