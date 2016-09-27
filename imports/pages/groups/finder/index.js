import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import Split, { Left, Right } from "../../../blocks/split";
import Headerable from "../../../mixins/mixins.Header";
import { nav as navActions } from "../../../store";

import Layout from "./Layout";
import Result from "./Result";

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

const defaultArray = [];
const mapStateToProps = state => ({ location: state.routing.location });
@withRouter
@connect(mapStateToProps)
@withGroupAttributes
@withTaggedContent
@ReactMixin.decorate(Headerable)
export default class Template extends Component {

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
    this.headerAction({ title: "Group Finder" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && Object.keys(nextProps.location.query).length) {
      this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    } else {
      this.props.dispatch(navActions.setLevel("TOP"));
    }
  }

  getResults = () => {
    const { tags, query } = this.state;
    const { router, location } = this.props;

    if (!location.query) location.query = {};

    if (query) location.query.q = query;
    if (tags.length) location.query.tags = tags.join(",").toLowerCase();

    if (location.query.campuses) delete location.query.campuses;

    // reset state
    this.setState({ tags: [], query: null });
    router.push(location);
  }

  inputOnChange = (value) => {
    this.setState({
      tags: this.state.tags,
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
      location.query.tags || location.query.q || location.query.campuses
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
