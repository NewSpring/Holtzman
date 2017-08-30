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
import Validate from "../../../util/validate";

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
    query: null,
    latitude: null,
    longitude: null,
    campus: "",
    zip: "",
    submit: false,
    iconFill: "#505050",
    geolocationLoading: false,
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

    // Nessesary to check if autofill even exists first
    if (!nextProps.autofill.loading && nextProps.autofill) {
      if (
        nextProps.autofill.person &&
        nextProps.autofill.person.campus &&
        nextProps.autofill.person.home
      ) {
        this.setState({
          campus: nextProps.autofill.person.campus.name,
          zip: nextProps.autofill.person.home.zip,
        });
      } else if (
        nextProps.location.query.campuses ||
        nextProps.location.query.zip
      ) {
        this.setState({
          campus: nextProps.location.query.campuses,
          zip: nextProps.location.query.zip,
        });
      }
    } else if (
      nextProps.location.query.tags ||
      nextProps.location.query.raw ||
      nextProps.location.query.campuses ||
      nextProps.location.query.zip
    ) {
      this.setState({
        tags:
          nextProps.location.query.tags && nextProps.location.query.tags.length
            ? nextProps.location.query.tags.split(",")
            : [],
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

    const tags = [];
    const q = [];

    // find the tags that aren't defined
    this.state.tags.forEach(e => {
      if (e && attributeTags.indexOf(e) > -1) {
        tags.push(e);
      } else {
        q.push(e);
      }
    });

    console.log(q);

    if (!location.query) location.query = {};

    if (q.length) location.query.q = q.join(",").toLowerCase();
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

  campusOnChange = (c: String) => {
    this.setState({
      campus: c || "",
    });
  };

  // XXX will need to figure out way to remove submit if zip is invalid
  zipOnChange = (z: String) => {
    if (Validate.isLocationBasedZipCode(z)) {
      this.setState({
        zip: z || "",
      });
    }
  };

  inputOnChange = (value: String) => {
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
    });
  };

  tagOnClick = (tag: String) => {
    const tagList = [...this.state.tags];
    let queryString = this.state.query || "";

    if (tagList.indexOf(tag) > -1) {
      queryString = queryString.replace(new RegExp(`(,? ?)${tag}`), "");
      if (queryString[0] === ",") {
        queryString = queryString.substring(1);
      }
      tagList.splice(tagList.indexOf(tag), 1);
    } else {
      queryString =
        queryString && queryString.length ? `${queryString}, ${tag}` : `${tag}`;
      tagList.push(tag);
    }

    this.setState({
      tags: tagList,
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

    // let selectedCampus = this.state.campus;
    // let zipCode = this.state.zip;
    // const query = location.query.raw ? location.query.raw : this.state.query;

    // if (
    //   (location.query.campus || location.query.zip) &&
    //   (!this.state.zip || !this.state.campus)
    // ) {
    //   zipCode = !this.state.zip ? location.query.zip : this.state.zip;
    //   selectedCampus = !this.state.campus
    //     ? location.query.campus
    //     : this.state.campus;
    // }

    // if (
    //   !location.query.campus &&
    //   !location.query.zip &&
    //   !autofill.loading &&
    //   autofill.person &&
    //   !this.state.campus &&
    //   !this.state.zip
    // ) {
    //   selectedCampus = autofill.person.campus.name;
    //   zipCode = autofill.person.home.zip;
    // }

    // if (location.query.campuses) {
    //   selectedCampus = location.query.campuses.split(",");
    //   selectedCampus = selectedCampus[0];
    // }

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
            zipOnChange={this.zipOnChange}
            zipDisabled={this.state.latitude && this.state.longitude}
            campusOnChange={this.campusOnChange}
            searchQuery={this.state.query}
            tags={(attributes && attributes.tags) || defaultArray}
            tagOnClick={this.tagOnClick}
            selectedTags={this.state.tags}
            submitTags={this.submitTags}
            findByQuery={this.findByQuery}
            inputOnChange={this.inputOnChange}
            content={content.loading ? defaultArray : content.entries}
            getLocation={this.geoLocateMe}
            geolocationLoading={this.state.geolocationLoading}
            iconFill={this.state.iconFill}
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
