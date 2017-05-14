/* eslint-disable max-len */
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { Meteor } from "meteor/meteor";

import infiniteScroll from "../../../components/@enhancers/infinite-scroll";

import { nav as navActions } from "../../../data/store";
// import ReactTooltip from "react-tooltip";
// import Truncate from "truncate";

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import GoogleMap from "../../../components/@primitives/map";
import Layout from "./ResultLayout";

// HACK
let internalIp = null;
if (Meteor.isClient) {
  // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
  const RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection; // compatibility for firefox and chrome

  if (RTCPeerConnection) {
    const pc = new RTCPeerConnection({ iceServers: [] });
    const noop = () => {};
    // create a bogus data channel
    if (typeof pc.createDataChannel === "function") {
      pc.createDataChannel("");
      // create offer and set local description
      pc.createOffer(pc.setLocalDescription.bind(pc), noop);
      // listen for candidate events
      pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
          ice.candidate.candidate,
        )[1];
        internalIp = myIP;
        pc.onicecandidate = noop;
      };
    }
  }
}
const defaultArray = [];
class TemplateWithoutData extends Component {
  static propTypes = {
    q: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    done: PropTypes.bool,
    loading: PropTypes.bool,
    Loading: PropTypes.func,
    /* eslint-disable */
    data: PropTypes.shape({
      groups: PropTypes.shape({
        count: PropTypes.number,
        results: PropTypes.array,
      }),
    }),
    /* eslint-enable */
    campusLocations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    campuses: PropTypes.string.isRequired,
    schedules: PropTypes.string.isRequired,
  }

  state = {
    showTags: false,
    showSearch: false,
    hover: null,
  }

  componentWillMount() {
    if (this.props.q) this.setState({ showSearch: true });
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
  }

  onCardHover = (e) => {
    const { id } = e.currentTarget;
    this.setState({ hover: id });
  }

  onMarkerHover =(marker) => this.setState({ hover: marker.id })

  getMarkers = (groups = []) => {
    const markers = [];
    return _.uniq(markers.concat(groups
      .filter((x) => x.locations && x.locations.length && x.locations[0].location)
      .map((x) => ({
        latitude: x.locations[0].location.latitude,
        longitude: x.locations[0].location.longitude,
        id: x.id,
        // children: this.createChild(x),
      }))
      .filter((x) => x.latitude && x.longitude)
    ), (x) => x.id);
  }

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch })
  toggleTags = () => this.setState({ showTags: !this.state.showTags })

  removeQueryString = (e) => {
    if (e) e.preventDefault();
    const { location, router } = this.props;

    if (location && location.query && location.query.q) delete location.query.q;
    const newPath = router.createPath(location);
    router.replace(newPath);
  }

  render() {
    const { data, tags, campusLocations, campuses, schedules, q, done, Loading, loading } = this.props;
    let count;
    let groups = defaultArray;
    if (data.groups && data.groups.count) count = data.groups.count;
    if (data.groups && data.groups.results) groups = data.groups.results;

    let isMobile;
    if (typeof window !== "undefined" && window !== null) {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
    }

    const markers = this.getMarkers(groups);

    return (
      <div>
        <Split>
          {/* Map */}
          <Right mobile={false} classes={["background--left"]}>
            {(() => {
              if (isMobile || Meteor.isServer) return null;
              return (
                <GoogleMap
                  autoCenter
                  markers={markers}
                  onMarkerHover={this.onMarkerHover}
                  hover={this.state.hover}
                  onChildClick={({ id }) => this.props.router.push(`/groups/${id}`)}
                />
              );
            })()}
          </Right>
        </Split>
        <Left scroll classes={["background--light-secondary"]}>
          <Layout
            loading={loading}
            LoadingComponent={Loading}
            groups={groups}
            count={count}
            tags={tags && tags.split(",").filter((x) => x)}
            schedules={schedules && schedules.split(",").filter((x) => x)}
            campuses={campuses && campuses.split(",").filter((x) => x)}
            campusLocations={campusLocations}
            query={q}
            done={done}
            removeQueryString={this.removeQueryString}
            showTags={this.state.showTags}
            toggleTags={this.toggleTags}
            showSearch={this.state.showSearch}
            toggleSearch={this.toggleSearch}
            onCardHover={this.onCardHover}
          />
        </Left>
      </div>
    );
  }
}

const mapStateToProps = ({ routing: { location } }) => {
  const tags = Object.keys(location.query).length && location.query.tags ? location.query.tags : "";
  const q = Object.keys(location.query).length && location.query.q ? location.query.q : null;
  const campuses = (
    Object.keys(location.query).length && location.query.campuses ? location.query.campuses : ""
  );
  const schedules = (
    Object.keys(location.query).length && location.query.schedules ? location.query.schedules : ""
  );
  return { tags, q, location, campuses, schedules };
};

const CAMPUS_LOCATION_QUERY = gql`
  query GetCampuses { campuses { entityId, id, name } }
`;

const withCampusLocations = graphql(CAMPUS_LOCATION_QUERY, { name: "campusLocations" });

const GROUP_FINDER_QUERY = gql`
  query GroupFinder($query: String, $tags: [String], $limit: Int, $offset: Int, $ip: String, $campuses: [String], $schedules: [Int]) {
    groups(query: $query, attributes: $tags, limit: $limit, offset: $offset, clientIp: $ip, campuses: $campuses, schedules: $schedules) {
      count
      results {
        id
        name
        entityId
        type
        kidFriendly
        demographic
        description
        photo
        ageRange
        distance
        schedule { description }
        locations { location { latitude, longitude } }
        tags { id, value }
        campus { name, entityId }
      }
    }
  }
`;

const getDay = (schedule: String) => {
  switch (schedule) {
    case "sunday": return 0;
    case "monday": return 1;
    case "tuesday": return 2;
    case "wednesday": return 3;
    case "thursday": return 4;
    case "friday": return 5;
    case "saturday": return 6;
    default: return "";
  }
};

const withGroupFinder = graphql(GROUP_FINDER_QUERY, {
  options: (ownProps) => ({
    ssr: false,
    variables: {
      tags: ownProps.tags && ownProps.tags.split(",").filter((x) => x),
      query: ownProps.q,
      ip: internalIp,
      limit: 10,
      offset: 0,
      campuses: ownProps.campuses && ownProps.campuses.split(",").filter((x) => x),
      schedules: ownProps.schedules && ownProps.schedules.length ? ownProps.schedules.split(",").filter((x) => x).map((x) => getDay(x)) : [],
    },
  }),
  props: ({ data }) => ({
    data,
    loading: data.loading,
    done: (
      data.groups &&
      data.groups.count === data.groups.results.length
    ),
    fetchMore: () => data.fetchMore({
      variables: { offset: data.groups.results.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) { return previousResult; }
        if (fetchMoreResult.data.groups.results === 0) {
          fetchMoreResult.data.groups.results.push(fetchMoreResult.data.groups.results[fetchMoreResult.data.groups.results.length - 1]);
        }
        return {
          groups: {
            count: fetchMoreResult.data.groups.count,
            // Append the new feed results to the old one
            results: [...previousResult.groups.results, ...fetchMoreResult.data.groups.results],
          },
        };
      },
    }),
  }),
});

export default withRouter(
  withCampusLocations(
    connect(mapStateToProps)(
      withGroupFinder(
        infiniteScroll((x) => x, { doneText: "No more groups" })(
          TemplateWithoutData
        )
      )
    )
  )
);

export {
  TemplateWithoutData,
};
