import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import Split, {
  Left,
  Right,
} from "../../../components/@primitives/layout/split";
import Headerable from "../../../deprecated/mixins/mixins.Header";
import { nav as navActions, modal } from "../../../data/store";

import Layout from "./Layout";
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
    query: "",
    latitude: null,
    longitude: null,
    campus: "",
    zip: "",
    submit: false,
    geolocationLoading: false,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "Group Finder" });
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.location && Object.keys(nextProps.location.query).length) {
      this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    } else {
      this.props.dispatch(navActions.setLevel("TOP"));
    }

    // Nessesary to check if autofill even exists first
    if (!nextProps.autofill.loading && nextProps.autofill.person) {
      if (
        nextProps.autofill.person &&
        nextProps.autofill.person.campus &&
        nextProps.autofill.person.home
      ) {
        this.setState({
          query: nextProps.location.query.raw || "",
          campus: nextProps.autofill.person.campus.name,
          zip: nextProps.autofill.person.home.zip,
        });
      } else if (
        nextProps.location.query.raw ||
        nextProps.location.query.campuses ||
        nextProps.location.query.zip
      ) {
        this.setState({
          query: nextProps.location.query.raw || "",
          campus: nextProps.location.query.campuses,
          zip: nextProps.location.query.zip,
        });
      }
    } else if (
      nextProps.location.query.raw ||
      nextProps.location.query.campuses ||
      nextProps.location.query.zip
    ) {
      this.setState({
        query: nextProps.location.query.raw,
        campus: nextProps.location.query.campuses,
        zip: nextProps.location.query.zip,
      });
    }
  }

  geoLocateMe = (e: Event) => {
    if (e) e.preventDefault();

    if (this.state.latitude && this.state.longitude) {
      this.setState({
        latitude: null,
        longitude: null,
        zip: this.props.autofill.person ? this.props.autofill.person.zip : "",
        geoLocationLoading: false,
      });
    } else {
      this.setState({
        geolocationLoading: true,
      });

      navigator.geolocation.getCurrentPosition(
        this.geolocationSuccess,
        this.geolocationError,
      );
    }
  };

  geolocationSuccess = (position: Object) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zip: "Using your location",
      geolocationLoading: false,
    });
  };

  geolocationError = error => {
    this.props.dispatch(modal.render(ErrTemplate, { errorCode: error.code }));
    this.setState({
      geolocationLoading: false,
    });
  };

  getResults = () => {
    const { router, location } = this.props;
    const { latitude, longitude, campus, zip, query } = this.state;
    // create an array of the attributes returned by graphql
    const attributeTags = this.props.attributes.tags.map(tag => tag.value);

    const q = [];
    const tags = this.state.query
      .split(/[, ]+/)
      .reduce((result, t, index, original) => {
        if (attributeTags.indexOf(t) > -1) {
          result.push(t);
        } else if (t === "kid" && original[index + 1] === "friendly") {
          result.push("kid friendly");
        } else if (
          t !== "and" &&
          t !== "or" &&
          t !== "the" &&
          t !== "from" &&
          t !== "also" &&
          t !== "friendly" &&
          t !== "with"
        ) {
          q.push(t);
        }
        return result;
      }, []);

    if (!location.query) location.query = {};

    if (q && q.length) location.query.q = q.join(",").toLowerCase();
    if (tags.length) location.query.tags = tags.join(",").toLowerCase();

    if (location.query.campus) delete location.query.campus;
    if (location.query.schedules) delete location.query.schedules;

    if (query) location.query.raw = query;
    if (latitude) location.query.latitude = latitude;
    if (longitude) location.query.longitude = longitude;
    if (campus) location.query.campuses = campus;
    if (zip) location.query.zip = zip;

    // XXX i don't like the idea of having to push history twice
    router.push(location);

    location.pathname = "/groups/finder";
    router.push(location);
  };

  inputOnChange = (value: String, e: any) => {
    this.setState({
      [e.name]: value,
    });
  };

  tagOnClick = (tag: String) => {
    let queryString = this.state.query || "";
    const regex = `(,?\\s?\\b${tag.toString()}\\b)`;

    if (queryString.search(new RegExp(regex, "i")) > -1) {
      queryString = queryString.replace(new RegExp(regex, "i"), "");

      if (queryString[0] === ",") {
        queryString = queryString.substring(1);
      }
    } else {
      queryString =
        queryString && queryString.length
          ? `${queryString}, ${tag.toString()}`
          : `${tag.toString()}`;
    }

    this.setState({
      query: queryString.trim(),
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
    const { attributes, autofill, content } = this.props;

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
            canSearchTags={
              false ||
              Boolean(this.state.tags.length) ||
              Boolean(this.state.query)
            }
            canSearchCampus={false || Boolean(this.state.campus)}
            canSearchLocation={
              false ||
              this.state.zip ||
              (this.state.latitude && this.state.longitude)
            }
            campuses={
              autofill.loading
                ? [""]
                : autofill.campuses
                    .filter(x => {
                      if (x.name === "Web") {
                        return false;
                      }

                      return true;
                    })
                    .map(x => x.name.toLowerCase())
            }
            selectedCampus={this.state.campus}
            zip={this.state.zip}
            zipDisabled={this.state.latitude && this.state.longitude}
            searchQuery={this.state.query || ""}
            tags={(attributes && attributes.tags) || defaultArray}
            tagOnClick={this.tagOnClick}
            submitTags={this.submitTags}
            findByQuery={this.findByQuery}
            inputOnChange={this.inputOnChange}
            content={content.loading ? defaultArray : content.entries}
            getLocation={this.geoLocateMe}
            geolocationLoading={this.state.geolocationLoading}
            iconFill={"#505050"}
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
  query GetTaggedContent(
    $tagName: String!
    $limit: Int
    $includeChannels: [String]
  ) {
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
      withAutoFillMeta(
        withTaggedContent(ReactMixin.decorate(Headerable)(TemplateWithoutData)),
      ),
    ),
  ),
);

export { TemplateWithoutData };
