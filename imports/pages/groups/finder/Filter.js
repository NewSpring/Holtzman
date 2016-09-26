import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";

import Forms from "../../../components/forms";

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
  campusLocations: {
    query: gql`
      query GetCampuses {
        campuses {
          entityId
          id
          name
        }
      }
    `
  }
});
const mapStateToProps = state => ({ location: state.routing.location });
const defaultTags = [];
@withRouter
@connect({ mapQueriesToProps, mapStateToProps })
export default class Filter extends Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    attributes: PropTypes.object.isRequired,
    showSearch: PropTypes.bool.isRequired,
    showTags: PropTypes.bool.isRequired,
    q: PropTypes.string,
  }

  state = { query: null }

  findByQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    document.getElementById("search").blur();

    const { query } = this.state;
    const { router, location } = this.props;

    if (!location.query) location.query = {};
    if (query) location.query.q = query;

    // reset state
    this.setState({ query: null });
    router.push(location);
  }

  removeQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    this.props.toggleSearch();

    const { router, location } = this.props;

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
      campusLocations,
      showSearch,
      showTags,
      q,
    } = this.props;
    const tags = attributes.tags ? attributes.tags : defaultTags;
    const campuses = campusLocations.campuses ? campusLocations.campuses : defaultTags;
    return (
      <div>

        {/* filter internals */}
        {(() => {
          if (!showTags) return null; // hidden
          if (!tags.length) return null; // XXX loading....
          return (
            <div>
              <div className="soft-half-sides soft-top soft-double-top@anchored text-center background--light-primary">
                <h4 className="soft-half-bottom flush-bottom">
                  Featured Tags
                </h4>
                <div className="two-thirds@anchored display-inline-block soft-ends@anchored">
                  {tags.map((tag, key) => <Tag key={key} val={tag.value} />)}
                </div>
              </div>
              <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double-bottom@anchored text-center background--light-primary">
                <h4 className="soft-half-bottom flush-bottom">
                  Campuses
                </h4>
                <div className="two-thirds@anchored display-inline-block soft-ends@anchored">
                  {campuses.map((campus, key) => (
                    <Tag key={key} val={campus.name} urlKey="campuses"/>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {(() => {
          if (!showSearch) return null;
          return (
            <div
              className={
                "outlined--light outlined--bottom soft-half-sides@handheld soft " +
                "soft-double@anchored text-left background--light-primary"
              }
            >

              <Forms.Form
                  classes={["hard", "display-inline-block", "one-whole" ]}
                  submit={(e) => this.findByQuery(e)}
                  action
              >
                <i className="icon-search locked-left soft-half-left" />
                <span
                  style={{
                    zIndex: 1,
                    padding: "20px 0px",
                    "marginTop": "-15px",
                    "cursor": "pointer"
                  }}
                  onClick={this.removeQuery}
                  className="h7 locked-right flush-bottom"
                >Cancel</span>
                <Forms.Input
                    id="search"
                    name="search"
                    ref="searchInput"
                    hideLabel
                    classes={["hard-bottom", "soft-right", "push-double-right"]}
                    inputClasses="soft-double-left soft-half-bottom"
                    placeholder="Type your search here..."
                    type="text"
                    defaultValue={q}
                    onChange={(e) => this.inputOnChange(e)}
                    autofocus={true}
                />

                <div className="one-whole text-left">
                  <h6><em>Find a group by zipcode, name, campus, or description</em></h6>
                </div>
              </Forms.Form>

            </div>
          );
        })()}
      </div>
    );
  }

}
