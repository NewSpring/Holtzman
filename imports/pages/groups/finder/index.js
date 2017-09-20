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
    attributes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    campuses: PropTypes.object.isRequired,
    campus: PropTypes.string,
    zip: PropTypes.string,
  };

  state = {
    tags: [],
    query: "",
    latitude: null,
    longitude: null,
    campus: "",
    zip: "",
    submit: false,
    geoLocationLoading: false,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "Group Finder" });
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    this.props.dispatch(navActions.setLevel("TOP"));

    if (!nextProps.loading) {
      this.setState({
        campus: nextProps.campus,
        zip: nextProps.zip,
        ...nextProps.location.query,
      });
    } else {
      this.setState({
        ...nextProps.location.query,
      });
    }
  }

  componentDidMount() {
    const { router, location } = this.props;
    if (location.query.tags && location.query.tags.length) {
      delete location.query.tags;
      router.push(location);
    }
  }

  geoLocateMe = (e: Event) => {
    if (e) e.preventDefault();

    if (this.state.latitude && this.state.longitude) {
      this.setState({
        latitude: null,
        longitude: null,
        zip: this.props.zip,
        geoLocationLoading: false,
      });
    } else {
      this.setState({
        geoLocationLoading: true,
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
      geoLocationLoading: false,
    });
  };

  geolocationError = error => {
    this.props.dispatch(modal.render(ErrTemplate, { errorCode: error.code }));
    this.setState({
      geoLocationLoading: false,
    });
  };

  getResults = () => {
    const { router, location } = this.props;
    const { latitude, longitude, campus, zip, query } = this.state;
    // create an array of the attributes returned by graphql
    const attributeTags = this.props.attributes.tags.map(tag => tag.value);

    const q = [];

    // split the query up into individual words and check to see which
    // are actual attributes
    const tags = this.state.query
      .split(/[, ]+/)
      .reduce((result, tag, index, original) => {
        const t = tag.toLowerCase();
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

    // start building the router querystring
    location.query = {};

    if (q && q.length > 0 && q[0] !== "") {
      location.query.q = q.join(" ").toLowerCase();
    }

    if (tags.length) location.query.tags = tags.join(",").toLowerCase();

    if (location.query.campus) delete location.query.campus;
    if (location.query.schedules) delete location.query.schedules;

    if (query) location.query.query = query;
    if (latitude) location.query.latitude = latitude;
    if (longitude) location.query.longitude = longitude;
    if (campus) location.query.campus = campus;
    if (zip && !latitude && !longitude) location.query.zip = zip;

    // XXX i don't like the idea of having to push history twice
    // but this is the only way to preserve state with a back button
    router.push(location);

    // navigate too
    location.pathname = "/groups/finder";
    router.push(location);
  };

  // function that gets passed in to each field to update state on parent
  // component
  inputOnChange = (value: String, e: any) => {
    this.setState({
      [e.name]: value,
    });
  };

  // for tags only, add tags to state.query
  tagOnClick = (tag: String) => {
    let queryString = this.state.query || "";

    // regex checks queryString for exact word match with optional space (\s) or
    // comma (,?). notice the double backslashes
    const regex = `(,?\\s?\\b${tag.toString()}\\b)`;

    if (queryString.search(new RegExp(regex, "i")) > -1) {
      queryString = queryString.replace(new RegExp(regex, "i"), "");

      if (queryString[0] === ",") {
        queryString = queryString.substring(1);
      }
    } else {
      // if the tag was not found append to the end of querystring with a comma
      // and space
      queryString =
        queryString && queryString.length
          ? `${queryString}, ${tag.toString()}`
          : `${tag.toString()}`;
    }

    this.setState({
      query: queryString.trim(),
    });
  };

  submitForm = (e: Event) => {
    if (e.type === "keypress" && e.key === "Enter") {
      if (
        this.state.tags.length ||
        this.state.query ||
        this.state.campus ||
        this.state.zip ||
        (this.state.latitude || this.state.longitude)
      ) {
        e.preventDefault();
        this.submitTags();
      }
    }
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
    const { attributes, campuses, campus, zip, content } = this.props;

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
            campuses={campuses || defaultArray}
            selectedCampus={this.state.campus}
            zip={
              this.state.latitude && this.state.longitude
                ? "Using your location"
                : this.state.zip
            }
            zipDisabled={Boolean(this.state.latitude && this.state.longitude)}
            searchQuery={this.state.query || ""}
            tags={(attributes && attributes.tags) || defaultArray}
            tagOnClick={this.tagOnClick}
            submitTags={this.submitTags}
            submitForm={this.submitForm}
            findByQuery={this.findByQuery}
            inputOnChange={this.inputOnChange}
            content={content.loading ? defaultArray : content.entries}
            getLocation={this.geoLocateMe}
            geoLocationLoading={this.state.geoLocationLoading}
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
      home {
        zip
      }
      campus {
        name
      }
    }
    campuses {
      name
    }
  }
`;

const withAutoFillMeta = graphql(AUTOFILL_META_QUERY, {
  props: ({ data, data: { person, campuses } }) => ({
    ...data,
    zip: person && person.home && person.home.zip ? person.home.zip : "",
    campus: person ? person.campus.name.toLowerCase() : "",
    campuses: campuses
      ? campuses
          .filter(x => {
            if (x.name === "Web") {
              return false;
            }

            return true;
          })
          .map(x => ({ label: x.name, value: x.name.toLowerCase() }))
      : defaultArray,
  }),
});

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
