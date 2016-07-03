import { Component, PropTypes} from "react";
import { connect } from "react-apollo";
import { Link } from "react-router";
import gql from "apollo-client/gql";
import GoogleMap from "apollos/dist/core/components/map";
import Split, { Left, Right } from "apollos/dist/core/blocks/split";

import { nav as navActions, modal } from "apollos/dist/core/store";
import OnBoard from "apollos/dist/core/blocks/accounts";

import Layout from "./Layout";
import Join from "./Join";

const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query GetGroup($id: ID!) {
        person: currentPerson {
          id
          firstName
          nickName
        }
        group: node(id: $id) {
          id
          ... on Group {
            name
            entityId
            type
            demographic
            description
            photo
            kidFriendly
            ageRange
            tags {
              id
              value
            }
            locations {
              location {
                distance
                city
                state
              }
            }
            schedule {
              description
              name
            }
            members {
              role
              person {
                photo
                firstName
                nickName
                lastName
              }
            }
          }
        }
      }
    `,
    variables: { id: ownProps.params.id }
  },
});
const defaultArray = [];
@connect({ mapQueriesToProps })
export default class Template extends Component {

  closeModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    this.props.dispatch(modal.hide())
  }

  sendRequest = (e, callback) => {
    if (e && e.preventDefault) e.preventDefault();

    const { currentTarget } = e
    let message = currentTarget.querySelectorAll("textarea")[0].value.replace(new RegExp("\\n", "gmi"), "<br/>")

    Meteor.call("community/actions/join",
      this.props.data.group.entityId, message, callback
    );
  }

  join = () => {
    const joinModal = () => {
      this.props.dispatch(modal.render(Join, {
        group: this.props.data.group,
        onExit: this.closeModal,
        onClick: this.sendRequest,
      }));
    }

    if (Meteor.userId()) return joinModal();

    this.props.dispatch(modal.render(OnBoard, {
      onFinished: joinModal,
      coverHeader: true,
    }));
  }

  render () {
    const { data } = this.props;

    if (data.loading) return null;
    let { group, person, errors } = data;
    let isLeader;
    const leaders = group && group.members && group.members
      .filter(x => x.role.toLowerCase() === "leader");

    isLeader = person && leaders.filter(x => x.id === person.id).length;
    group.photo || (group.photo = "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png");

    let markers = defaultArray;
    if (group.locations && group.locations.length && group.locations[0].location) {
      const { latitude, longitude } = group.locations[0].location;
      markers = [{ latitude, longitude }];
    }
    let isMobile;
    if (typeof window != "undefined" && window != null ) {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
    }
    return (
      <div>
        <Split>
          {/* Map */}
          <Right mobile={false} classes={["background--left"]}>
            {(() => {
              if (isMobile) return null;
              return (
                <GoogleMap
                  autoCenter={true}
                  markers={markers}
                />
              )
            })()}
          </Right>
        </Split>
        <Left scroll={true} classes={["background--light-secondary"]}>
          <Layout
            isLeader={isLeader}
            group={group}
            leaders={leaders || defaultArray}
            join={this.join}
          />
        </Left>
      </div>
    )

  }
}
