import { Component, PropTypes} from "react";
import { connect } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { nav as navActions } from "apollos/dist/core/store"

import Split, { Left, Right } from "apollos/dist/core/blocks/split";
import GoogleMap from "apollos/dist/core/components/map";
import Layout from "./ResultLayout";

const mapStateToProps = ({ routing }) => {
  const { location } = routing;
  const tags = Object.keys(location.query).length && location.query.tags ? location.query.tags : "";
  const q = Object.keys(location.query).length && location.query.q ? location.query.q : null;
  return { tags, q, location };
}

const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query GroupFinder($query: String, $tags: [String], $limit: Int, $offset: Int) {
        groups(query: $query, attributes: $tags, limit: $limit, offset: $offset) {
          count
          results {
            id
            name
            entityId
            type
            demographic
            description
            photo
            ageRange
            distance
            locations {
              location {
                latitude
                longitude
              }
            }
            tags {
              id
              value
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
    variables: {
      tags: ownProps.tags.split(",").filter(x => x),
      query: ownProps.q,
      limit: 10,
      offset: 0,
    },
  },
});
const defaultArray = [];
@withRouter
@connect({ mapQueriesToProps, mapStateToProps })
export default class Template extends Component {

  state = {
    markers: [],
    showTags: false,
    showSearch: false,
    hover: null,
    groups: [], // XXX after refetchMore lands in apollo client, remove
    offset: 0,
  }

  paginate = () => {
    const { q, tags } = this.props;
    this.props.data.refetch({
      tags: tags.split(",").filter(x => x),
      query: q,
      limit: 10,
      offset: this.state.offset + 10,
    })
      .then(({ data }) => {
        const { results } = data.groups;
        this.setState({
          groups: this.state.groups.concat(results),
          offset: this.state.offset + 10,
        });
      });
  }

  componentWillMount() {
    if (this.props.q) this.setState({ showSearch: true });
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));

    if (this.props.data.groups) {
      const markers = this.getMarkers(this.props.data.groups.results);
      this.setState({ markers, groups: this.props.data.groups.results })
    }
  }

  onCardHover = (e) => {
    const { id } = e.currentTarget
    this.setState({ hover: id })
  }

  onMarkerHover = (marker) => {
    this.setState({ hover: marker.id })
  }

  componentWillReceiveProps(nextProps) {

    let newState = {}

    if (this.props.q !== nextProps.q || this.props.tags !== nextProps.tags) {
      if (nextProps.data.groups && nextProps.data.groups) {
        newState.groups = nextProps.data.groups.results;
      } else {
        newState.groups = [];
      }

    }

    if (this.props.data.loading && !nextProps.data.loading && !this.state.groups.length) {
      newState.groups = nextProps.data.groups.results
    }
    newState.markers = this.getMarkers(newState.groups);
    this.setState(newState);
  }

  toggleTags = () => this.setState({ showTags: !this.state.showTags })
  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch })


  getMarkers = (groups = []) => {
    const { markers } = this.state
    return markers.concat(groups)
      .filter(x => x.locations && x.locations.length && x.locations[0].location)
      .map(x => ({
        latitude: x.locations[0].location.latitude,
        longitude: x.locations[0].location.longitude,
        id: x.id,
      }))
      .filter(x => x.latitude && x.longitude);
  }

  removeQueryString = (e) => {
    if (e) e.preventDefault();
    const { location, router } = this.props;

    if (location && location.query && location.query.q) delete location.query.q;
    const newPath = router.createPath(location);
    router.replace(newPath);
  }

  render () {
    const { data, location, tags, q } = this.props;
    let count, groups = defaultArray;
    if (data.groups && data.groups.count) count = data.groups.count;
    groups = this.state.groups;

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
                  markers={this.state.markers}
                  onMarkerHover={this.onMarkerHover}
                  hover={this.state.hover}
                />
              )
            })()}
          </Right>
        </Split>
        <Left scroll={true} classes={["background--light-secondary"]}>
          <Layout
            loading={data.loading}
            groups={groups}
            count={count}
            tags={tags && tags.split(",").filter(x => x)}
            query={q}
            removeQueryString={this.removeQueryString}
            showTags={this.state.showTags}
            toggleTags={this.toggleTags}
            showSearch={this.state.showSearch}
            toggleSearch={this.toggleSearch}
            onCardHover={this.onCardHover}
            paginate={this.paginate}
          />
        </Left>
      </div>
    );
  }
}
