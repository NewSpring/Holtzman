/* eslint-disable max-len */
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";

import { nav as navActions } from "../../../store";
// import ReactTooltip from "react-tooltip";
// import Truncate from "truncate";

import Split, { Left, Right } from "../../../blocks/split";
import GoogleMap from "../../../components/map";
import Layout from "./ResultLayout";

// HACK
let internalIp = null;
if (Meteor.isClient) {
  // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
  const RTCPeerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;   // compatibility for firefox and chrome

  if (RTCPeerConnection) {
    const pc = new RTCPeerConnection({ iceServers: [] });
    const noop = () => {};
    // create a bogus data channel
    pc.createDataChannel("");
    // create offer and set local description
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    // listen for candidate events
    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        .exec(ice.candidate.candidate)[1];
      internalIp = myIP;
      pc.onicecandidate = noop;
    };
  }
}

const mapStateToProps = ({ routing: { location } }) => {
  const tags = Object.keys(location.query).length && location.query.tags ? location.query.tags : "";
  const q = Object.keys(location.query).length && location.query.q ? location.query.q : null;
  const campuses = (
    Object.keys(location.query).length && location.query.campuses ? location.query.campuses : ""
  );
  return { tags, q, location, campuses };
};

const CAMPUS_LOCATION_QUERY = gql`
  query GetCampuses { campuses { entityId, id, name } }
`;

const withCampusLocations = graphql(CAMPUS_LOCATION_QUERY, { name: "campusLocations" });

const GROUP_FINDER_QUERY = gql`
  query GroupFinder($query: String, $tags: [String], $limit: Int, $offset: Int, $ip: String, $campuses: [String]) {
    groups(query: $query, attributes: $tags, limit: $limit, offset: $offset, clientIp: $ip, campuses: $campuses) {
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

const withGroupFinder = graphql(GROUP_FINDER_QUERY, {
  options: ownProps => ({
    ssr: false,
    variables: {
      tags: ownProps.tags.split(",").filter(x => x),
      query: ownProps.q,
      ip: internalIp,
      limit: 10,
      offset: 0,
      campuses: ownProps.campuses.split(",").filter(x => x),
    },
  }),
  props: ({ data }) => ({
    data,
    paginate: () => data.fetchMore({
      variables: { offset: data.groups.results.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) { return previousResult; }
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

const defaultArray = [];
@withRouter
@withCampusLocations // enables this query to be static
@connect(mapStateToProps)
@withGroupFinder
export default class Template extends Component {

  static propTypes = {
    q: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    /* eslint-disable */
    data: PropTypes.shape({
      loading: PropTypes.bool,
      groups: PropTypes.shape({
        count: PropTypes.number,
        results: PropTypes.array,
      }),
    }),
    /* eslint-enable */
    campusLocations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    campuses: PropTypes.string.isRequired,
    paginate: PropTypes.func.isRequired,
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

  onMarkerHover =marker => this.setState({ hover: marker.id })

  getMarkers = (groups = []) => {
    const markers = [];
    return _.uniq(markers.concat(groups
      .filter(x => x.locations && x.locations.length && x.locations[0].location)
      .map(x => ({
        latitude: x.locations[0].location.latitude,
        longitude: x.locations[0].location.longitude,
        id: x.id,
        // children: this.createChild(x),
      }))
      .filter(x => x.latitude && x.longitude)
    ), x => x.id);
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
    const { data, tags, campusLocations, campuses, q } = this.props;
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
            loading={data.loading}
            groups={groups}
            count={count}
            tags={tags && tags.split(",").filter(x => x)}
            campuses={campuses && campuses.split(",").filter(x => x)}
            campusLocations={campusLocations}
            query={q}
            removeQueryString={this.removeQueryString}
            showTags={this.state.showTags}
            toggleTags={this.toggleTags}
            showSearch={this.state.showSearch}
            toggleSearch={this.toggleSearch}
            onCardHover={this.onCardHover}
            paginate={this.props.paginate}
          />
        </Left>
      </div>
    );
  }
}
