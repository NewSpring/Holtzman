import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import Headerable from "../../../deprecated/mixins/mixins.Header";
import { nav as navActions, modal } from "../../../data/store";

import Layout from "./Layout";
import Result from "./Result";
import ErrTemplate from "./ErrTemplate";

const defaultArray = [];

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    autofill: PropTypes.object.isRequired,
    attributes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
  };

  state = {
    tags: [],
    query: null,
    latitude: null,
    longitude: null,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "Group Finder" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && Object.keys(nextProps.location.query).length) {
      this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    } else {
      this.props.dispatch(navActions.setLevel("TOP"));
    }
  }

  geoLocateMe = (e: Event) => {
    if (e) e.preventDefault();
    navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError, {
      timeout: 5000,
    });
  };

  geolocationSuccess = (position: Object) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const zip = document.getElementById("zip");
    zip.value = "Using your location";
  };

  geolocationError = error => {
    this.props.dispatch(modal.render(ErrTemplate, { errorCode: error.code }));
  };

  getResults = () => {
    const { router, location } = this.props;
    const { latitude, longitude } = this.state;
    // create an array of the attributes returned by graphql
    const attributeTags = this.props.attributes.tags.map(tag => tag.value);

    const tags = [];
    const query = [];

    // find the tags that aren't defined
    this.state.tags.forEach(e => {
      if (e && attributeTags.indexOf(e) > -1) {
        tags.push(e);
      } else {
        query.push(e);
      }
    });

    if (!location.query) location.query = {};

    if (query.length) location.query.q = query.join(",").toLowerCase();
    if (tags.length) location.query.tags = tags.join(",").toLowerCase();

    if (location.query.campuses) delete location.query.campuses;
    if (location.query.schedules) delete location.query.schedules;

    if (latitude) location.query.latitude = latitude;
    if (longitude) location.query.longitude = longitude;

    this.setState({ tags: [], query: null, latitude, longitude });
    router.push(location);
  };

  inputOnChange = value => {
    // split each element of the query string into its own array element
    // at this point the query string also includes tags
    const queryString = value.split(/[, ]+/);

    const attributeTags = this.props.attributes.tags.map(tag => tag.value);

    // current state of tags to work off of.
    const newTags = [...this.state.tags];

    // remove the tags that have been removed from the search field
    const removeTags = newTags.filter(e => {
      if (e && queryString.indexOf(e) < 0) {
        newTags.splice(newTags.indexOf(e), 1);
      }
    });

    // map over the querystring elements and push the elements that are found in
    // the defined list but not currently in state
    const addTags = queryString.filter((e, i, a) => {
      if (e === "friendly" && a[i - 1] === "kid") {
        newTags.push("kid friendly");
      }

      if (e && newTags.indexOf(e) < 0 && attributeTags.indexOf(e) > -1) {
        newTags.push(e);
      }
    });

    this.setState({
      tags: newTags,
      query: value,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  };

  tagOnClick = (tag: String) => {
    const tagList = [...this.state.tags];
    let queryString = this.state.query || "";

    if (tagList.indexOf(tag) > -1) {
      queryString = queryString.replace(new RegExp(`(,? ?)${tag}`), "");
      tagList.splice(tagList.indexOf(tag), 1);
    } else {
      queryString = queryString && queryString.length ? `${queryString}, ${tag}` : `${tag}`;
      tagList.push(tag);
    }

    this.setState({
      tags: tagList,
      query: queryString.trim(),
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  };

  submitTags = (e: Event) => {
    if (e) e.preventDefault();
    this.getResults();
  };

  findByQuery = (e: Event) => {
    if (e) e.preventDefault();
    document.getElementById("search").blur();
    this.getResults();
  };

  /* eslint-disable max-len */
  render() {
    const { attributes, location, content, autofill } = this.props;
    if (
      location.query &&
      (location.query.tags ||
        location.query.q ||
        location.query.campuses ||
        location.query.schedules ||
        location.query.latitude ||
        location.query.longitude)
    ) {
      return <Result />;
    }
    return (
      <div>
        <Split>
          <Right
            mobile={false}
            classes={["background--left"]}
            background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.1x1_1700_1700_90_c1.jpg"
          />
        </Split>
        <Left scroll classes={["background--light-secondary"]}>
          <Layout
            canSearchTags={false || this.state.tags.length || this.state.query || autofill.person}
            campuses={autofill.loading ? [""] : autofill.campuses}
            user={autofill.loading ? "" : autofill.person}
            searchQuery={this.state.query}
            tags={(attributes && attributes.tags) || defaultArray}
            tagOnClick={this.tagOnClick}
            selectedTags={this.state.tags}
            submitTags={this.submitTags}
            findByQuery={this.findByQuery}
            inputOnChange={this.inputOnChange}
            content={content.loading ? defaultArray : content.entries}
            getLocation={this.geoLocateMe}
          />
        </Left>
      </div>
    );
  }
  /* eslint-enable max-len */
}

const AUTOFILL_META_QUERY = gql`
  query autoFillMeta {
    person: currentPerson {
      id
      firstName
      nickName
      home {
        zip
      }
      campus {
        name
      }
    }
    campuses {
      id
      name
    }
  }
`;

const withAutoFillMeta = graphql(AUTOFILL_META_QUERY, { name: "autofill" });

const GROUP_ATTRIBUTES_QUERY = gql`
  query GetGroupAttributes {
    tags: groupAttributes {
      id
      description
      value
    }
  }
`;

const withGroupAttributes = graphql(GROUP_ATTRIBUTES_QUERY, {
  name: "attributes",
});

const TAGGED_CONTENT_QUERY = gql`
  query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
    entries: taggedContent(
      tagName: $tagName
      limit: $limit
      includeChannels: $includeChannels
      cache: false
    ) {
      entryId: id
      title
      channelName
      meta {
        date
        summary
        urlTitle
      }
      content {
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
      }
    }
  }
`;

const withTaggedContent = graphql(TAGGED_CONTENT_QUERY, {
  name: "content",
  options: {
    variables: {
      tagName: "community",
      includeChannels: ["articles"],
      limit: 2,
    },
  },
});

const mapStateToProps = state => ({ location: state.routing.location });

export default withRouter(
  connect(mapStateToProps)(
    withGroupAttributes(
      withAutoFillMeta(withTaggedContent(ReactMixin.decorate(Headerable)(TemplateWithoutData)))
    )
  )
);

export { TemplateWithoutData };
