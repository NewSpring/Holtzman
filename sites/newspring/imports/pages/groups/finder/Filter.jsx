import { Component } from "react";
import { connect } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";

import Loading from "apollos/dist/core/components/loading/index";
import Forms from "apollos/dist/core/components/forms";

import Tag from "../components/Tag";

const mapQueriesToProps = () => ({
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
})
const mapStateToProps = (state) => ({ location: state.routing.location })
let defaultTags = [];
@withRouter
@connect({ mapQueriesToProps, mapStateToProps })
export default class Filter extends Component {

  state = { query: null }

  findByQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const { query } = this.state;
    let { router, location } = this.props;

    if (!location.query) location.query = {};
    if (query) location.query.q = query

    // reset state
    this.setState({ query: null });
    router.push(location);
  }

  removeQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    this.props.toggleSearch();

    const { query } = this.state;
    let { router, location } = this.props;

    if (location.query && location.query.q) delete location.query.q;
    // reset state
    this.setState({ query: null });
    router.push(location);

  }

  inputOnChange = (value) => {
    this.setState({ query: value });
  }

  render() {
    const {
      attributes,
      showSearch,
      toggleSearch,
      showTags,
      toggleTags,
      q,
    } = this.props;
    let tags = attributes.tags ? attributes.tags : defaultTags;
    return (
      <div>

        {/* filter internals */}
        {(() => {
          if (!showTags) return null; // hidden
          if (!tags.length) return null; // XXX loading....
          return (
            <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double-ends@anchored text-center background--light-primary">
              <h4 className="soft-half-bottom flush-bottom">
                Featured Tags
              </h4>
              <div className="two-thirds@anchored display-inline-block soft-ends@anchored">
                {tags.map((tag, key) => <Tag key={key} val={tag.value} />)}
              </div>
            </div>
          )
        })()}

        {(() => {
          if (!showSearch) return null;
          return (
            <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double@anchored text-left background--light-primary">

              <Forms.Form
                classes={["hard", "display-inline-block", "one-whole" ]}
                submit={(e) => this.findByQuery(e)}
              >
                <i style={{paddingTop: "4px"}} className="icon-search locked-left soft-half-left"></i>
                <span
                  style={{zIndex: 1, paddingTop: "5px", "cursor": "pointer"}}
                  onClick={this.removeQuery}
                  className="h7 locked-right soft-half-right flush-bottom"
                >Cancel</span>
                <Forms.Input
                  hideLabel={true}
                  classes={["hard-bottom", "soft-double-right", "push-double-right"]}
                  inputClasses="soft-double-left soft-half-bottom"
                  placeholder="Type your search here..."
                  type="text"
                  defaultValue={q}
                  onChange={(e) => this.inputOnChange(e)}
                />

              <div className="one-whole text-left">
                  <h6><em>Find a group by zipcode, name, campus, or description</em></h6>
                </div>
              </Forms.Form>

            </div>
          )
        })()}
      </div>
    )
  }

}
