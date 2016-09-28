import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";

import Headerable from "../../mixins/mixins.Header";

import modal from "../../store/modal";

import {
  search as searchActions,
  nav as navActions,
} from "../../store";

import Layout from "./Layout";

const mapStateToProps = state => ({ search: state.search });
@connect(mapStateToProps)
@ReactMixin.decorate(Headerable)
export default class SearchContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    query: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (!Meteor.isCordova) {
      this.props.dispatch(modal.update({ keepNav: true }));
    }

    this.lockHeader("DiscoverModal");
    this.headerAction({
      isSearch: true,
      searchSubmit: this.searchSubmit,
    }, "DiscoverModal");
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({ keepNav: false, layoutOverride: [] }));
    this.props.dispatch(searchActions.searching(false));
    this.unlockHeader();
  }


  getSearch() {
    const { dispatch } = this.props;
    const { page, pageSize, term } = this.props.search;
    const query = gql`
      query Search($term: String!, $first: Int, $after: Int, $site: String) {
        search(query: $term, first: $first, after: $after, site: $site) {
          total
          items {
            id
            title
            htmlTitle
            htmlDescription
            link
            image
            displayLink
            description
            type
            section
          }
        }
      }
    `;

    const variables = {
      term,
      first: pageSize,
      after: page * pageSize,
      site: "https://newspring.cc",
    };

    this.props.query({ query, variables, forceFetch: true })
      .then(({ data }) => {
        const { search } = data;
        dispatch(searchActions.toggleLoading());
        dispatch(searchActions.incrementPage());
        dispatch(searchActions.add(search.items));
        if (search.total === 0) {
          dispatch(searchActions.none(true));
        }
        if (this.props.search.items.length >= search.total) {
          dispatch(searchActions.done(true));
        }
      });
  }

  hide = () => (
    this.props.dispatch(modal.hide())
  )

  searchSubmit = (event) => {
    event.preventDefault();
    document.getElementById("search").blur();
    const { dispatch } = this.props;
    const term = document.getElementById("search").value;

    Promise.all([
      dispatch(searchActions.searching(true)),
      dispatch(searchActions.clear()),
      dispatch(searchActions.term(term)),
      dispatch(searchActions.toggleLoading()),
    ]).then(() => {
      this.getSearch();
    });
  }

  loadMore = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(searchActions.toggleLoading());
    this.getSearch();
  }

  render() {
    const search = this.props.search;

    return (
      <Layout
        loadMore={this.loadMore}
        search={search}
        hide={this.hide}
      />
    );
  }
}
