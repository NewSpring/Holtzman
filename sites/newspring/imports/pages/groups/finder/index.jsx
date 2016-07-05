import { Component, PropTypes} from "react";
import { connect } from "react-apollo";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import Split, { Left, Right } from "apollos/dist/core/blocks/split";
import { Headerable } from "apollos/dist/core/mixins"

import Layout from "./Layout";
import Result from "./Result"
const mapQueriesToProps = ({ ownProps }) => ({
  attributes: {
    query: gql`
      query GetGroupAttributes {
        tags: groupAttributes {
          id
          description
          value
        }
      }
    `,
  },
  content: {
    query: gql`
      query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
        entries: taggedContent(tagName: $tagName, limit: $limit, includeChannels: $includeChannels, cache: false) {
          entryId: id
          title
          meta {
            summary
            urlTitle
          }
          content {
            images {
              fileName
              fileType
              fileLabel
              s3
              cloudfront
            }
          }
        }
      }
    `,
    variables: {
      tagName: "community",
      includeChannels: ["articles"],
      limit: 2,
    }
  }
});

const defaultArray = [];
const mapStateToProps = (state) => ({ location: state.routing.location })
@withRouter
@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Headerable)
export default class Template extends Component {

  state = {
    tags: [],
    query: null,
  }

  componentWillMount() {
    this.headerAction({ title: "Group Finder" });
  }

  tagOnClick = (tag) => {
    let tagList = [...this.state.tags];
    if (tagList.indexOf(tag) > -1) {
      // remove the tag from the list string
      tagList.splice(tagList.indexOf(tag), 1);
    } else {
      tagList.push(tag);
    }

    this.setState({ tags: tagList });
  }

  inputOnChange = (value) => {
    this.setState({
      tags: this.state.tags,
      query: value
    });
  }

  getResults = () => {
    const { tags, query } = this.state;
    let { router, location } = this.props;

    if (!location.query) location.query = {};

    if (query) location.query.q = query
    if (tags.length) {
      location.query.tags = tags.join(",").toLowerCase()
    }
    // reset state
    this.setState({ tags: [], query: null });
    router.push(location);
  }

  submitTags = (e) => {
    if (e) e.preventDefault();
    this.getResults();
  }

  findByQuery = (e) => {
    if (e) e.preventDefault();
    this.getResults();
  }

  render () {
    const { attributes, location, content } = this.props;
    if (Object.keys(location.query).length) return <Result />;
    return (
      <div>
        <Split>
          <Right
            mobile={false}
            classes={["background--left"]}
            background="//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.1x1_1700_1700_90_c1.jpg"
          />
        </Split>
        <Left scroll={true} classes={["background--light-secondary"]}>
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

    )
  }
}
