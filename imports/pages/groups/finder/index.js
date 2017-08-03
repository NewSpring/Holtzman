import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import Split, { Left, Right } from "../../../components/@primitives/layout/split";
import Headerable from "../../../deprecated/mixins/mixins.Header";
import { nav as navActions } from "../../../data/store";

import Layout from "./Layout";
import Result from "./Result";

const defaultArray = [];
class TemplateWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    attributes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
  }

  state = {
    tags: [],
    query: null,
  }

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

  getResults = () => {
    const { router, location } = this.props;
    // create an array of the attributes returned by graphql
    const attributeTags = this.props.attributes.tags.map((tag) => {
      return tag.value;
    });

    let tags = [];
    let query = [];

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

    // reset state
    this.setState({ tags: [], query: null });
    router.push(location);
  }

  inputOnChange = (value) => {
    // split each element of the query string into its own array element,
    // at this point the query string also includes tags
    const queryString = value.split(/[, ]+/);

    // current state of tags to work off of.
    let newTags = this.state.tags;

    // remove the tags that have been removed from the search field
    const removeTags = newTags.filter(e => {
      if (e && queryString.indexOf(e) < 0) {
        newTags.splice(newTags.indexOf(e), 1);
      }
    });

    // map over the querystring elements and push the elements that are found in
    // the defined list but not currently in state
    const foundTags = queryString.filter(e => {
      if (e && this.state.tags.indexOf(e) < 0) {
        newTags.push(e);
      }
    });

    this.setState({
      tags: newTags,
      query: value,
    });
  }

  tagOnClick = (tag) => {
    const tagList = [...this.state.tags];
    if (tagList.indexOf(tag) > -1) {
      // remove the tag from the list string
      tagList.splice(tagList.indexOf(tag), 1);
    } else {
      tagList.push(tag);
    }

    this.setState({ tags: tagList });
  }

  submitTags = (e) => {
    if (e) e.preventDefault();
    this.getResults();
  }

  findByQuery = (e) => {
    if (e) e.preventDefault();
    document.getElementById("search").blur();
    this.getResults();
  }

  /* eslint-disable max-len */
  render() {
    const { attributes, location, content } = this.props;
    if (location.query && (
      location.query.tags
      || location.query.q
      || location.query.campuses
      || location.query.schedules
    )) return <Result />;
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
            canSearchTags={false || this.state.tags.length || this.state.query}
            tags={(attributes && attributes.tags) || defaultArray}
            tagOnClick={this.tagOnClick}
            selectedTags={this.state.tags}
            submitTags={this.submitTags}
            findByQuery={this.findByQuery}
            inputOnChange={this.inputOnChange}
            content={content.loading ? defaultArray : content.entries}
          />
        </Left>
      </div>

    );
  }
  /* eslint-enable max-len */
}

const GROUP_ATTRIBUTES_QUERY = gql`
  query GetGroupAttributes {
    tags: groupAttributes {
      id
      description
      value
    }
  }
`;

const withGroupAttributes = graphql(GROUP_ATTRIBUTES_QUERY, { name: "attributes" });

const TAGGED_CONTENT_QUERY = gql`
  query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
    entries: taggedContent(
      tagName: $tagName,
      limit: $limit,
      includeChannels: $includeChannels,
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
  options: ({
    variables: {
      tagName: "community",
      includeChannels: ["articles"],
      limit: 2,
    },
  }),
});

const mapStateToProps = (state) => ({ location: state.routing.location });

export default withRouter(
  connect(mapStateToProps)(
    withGroupAttributes(
      withTaggedContent(
        ReactMixin.decorate(Headerable)(
          TemplateWithoutData
        )
      )
    )
  )
);

export {
  TemplateWithoutData,
};
