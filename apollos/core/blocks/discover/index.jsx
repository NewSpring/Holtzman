import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Headerable } from "../../../core/mixins/"

import { GraphQL } from "../../../core/graphql"
import modal from "../../store/modal"

import { search as searchActions, nav as navActions } from "../../store"

import Layout from "./Layout"

const map = (state) => ({ search: state.search })
@connect(map)
@ReactMixin.decorate(Headerable)
export default class SearchContainer extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    this.props.dispatch(modal.update({keepNav: true}))

    this.headerAction({
      isSearch: true,
      searchSubmit: this.searchSubmit
    });
  }

  componentDidMount(){
    let term = this.props.search.term;

    // XXX
    //document.getElementById("search").value = term
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false, layoutOverride: []}))
  }

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  getSearch() {
    const { dispatch } = this.props
    let { page, pageSize, term } = this.props.search

    let query = `
      {
        search(query: "${term}", first: ${pageSize}, after: ${page * pageSize}, site: "https://newspring.cc") {
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
    `

    GraphQL.query(query)
      .then(({ search }) => {
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
