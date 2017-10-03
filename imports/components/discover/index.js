import { Meteor } from "meteor/meteor";
import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import ReactMixin from "react-mixin";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

import Headerable from "../../deprecated/mixins/mixins.Header";

import modal from "../../data/store/modal";

import {
  search as searchActions,
  nav as navActions,
} from "../../data/store";

import Layout from "./Layout";

const SEARCH_QUERY = gql`
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

class SearchContainerWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    client: PropTypes.object,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (!Meteor.isCordova) {
      this.props.dispatch(modal.update({ keepNav: true }));
    }

    if (this.lockHeader) {
      this.lockHeader("DiscoverModal");
    }
    if (this.headerAction) {
      this.headerAction({
        isSearch: true,
        searchSubmit: this.searchSubmit,
      }, "DiscoverModal");
    }
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({ keepNav: false, layoutOverride: [] }));
    this.props.dispatch(searchActions.searching(false));
    if (this.unlockHeader) {
      this.unlockHeader();
    }
  }


  getSearch() {
    const { dispatch } = this.props;
    const { page, pageSize, term } = this.props.search;

    const variables = {
      term,
      first: pageSize,
      after: page * pageSize,
      site: "https://newspring.cc",
    };

    this.props.client.query({ query: SEARCH_QUERY, variables, fetchPolicy: "network-only" })
      .then(({ data }) => {
        const { search } = data;
        const propsSearch = this.props.search;
        dispatch(searchActions.toggleLoading());
        dispatch(searchActions.incrementPage());
        dispatch(searchActions.add(search.items));
        if (search.total === 0) {
          dispatch(searchActions.none(true));
        }
        if (!propsSearch || !propsSearch.items || propsSearch.items.length >= search.total) {
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

const map = (state) => ({ search: state.search });
const withRedux = connect(map);
const withHeader = ReactMixin.decorate(Headerable);

export default withApollo(withRedux(withHeader(SearchContainerWithoutData)));

export {
  SearchContainerWithoutData,
  SEARCH_QUERY,
  map,
  withRedux,
  withHeader,
};
