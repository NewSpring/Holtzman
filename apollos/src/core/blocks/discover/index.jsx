import { Component, PropTypes } from "react"
import { connect } from "react-apollo"
import ReactMixin from "react-mixin"
import gql from "apollo-client/gql";

import { Headerable } from "../../../core/mixins/";

import modal from "../../store/modal";

import {
  search as searchActions,
  nav as navActions,
} from "../../store";

import Layout from "./Layout";

const mapStateToProps = (state) => ({ search: state.search })
@connect({ mapStateToProps })
@ReactMixin.decorate(Headerable)
export default class SearchContainer extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    if (!Meteor.isCordova) {
      this.props.dispatch(modal.update({keepNav: true}))
    }

    this.lockHeader("DiscoverModal");
    this.headerAction({
      isSearch: true,
      searchSubmit: this.searchSubmit
    }, "DiscoverModal");
  }

  componentDidMount(){
    let term = this.props.search.term;

    // XXX
    //document.getElementById("search").value = term
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false, layoutOverride: []}));
    this.unlockHeader();
  }

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  getSearch() {
    const { dispatch } = this.props
    let { page, pageSize, term } = this.props.search
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
      })

  }

  searchSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props
    let term = document.getElementById("search").value;

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
    const { dispatch } = this.props

    dispatch(searchActions.toggleLoading());
    this.getSearch();
  }

  cancel = (event) => {
    event.preventDefault();
    const { dispatch } = this.props

    dispatch(searchActions.searching(false));
    document.getElementById("search").value = ""
  }

  render() {
    const search = this.props.search

    return (
      <Layout
        loadMore={this.loadMore}
        cancel={this.cancel}
        search={search}
        hide={this.hide}
      />
    );

  }
}
