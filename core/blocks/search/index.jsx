import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "../../../core/graphql"
import modal from "../../store/modal"

import { search as searchActions } from "../../store"

import Item from "./Item"

const map = (state) => ({ search: state.search })
@connect(map)
export default class SearchContainer extends Component {

  componentDidMount() {
    let term = this.props.search.term;

    document.getElementById("search").value = term
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false}))
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

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  searchSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props
    let term = document.getElementById("search").value;

    Promise.all([
      dispatch(searchActions.clear()),
      dispatch(searchActions.term(term)),
      dispatch(searchActions.toggleLoading()),

      dispatch(searchActions.done(false)),
      dispatch(searchActions.none(false))
    ]).then(() => {
      this.getSearch({ clear: true });
    });
  }

  loadMore = (event) => {
    event.preventDefault();
    const { dispatch } = this.props

    dispatch(searchActions.toggleLoading());
    this.getSearch();
  }

  render(){
    return (
      <section className="hard-sides hard-bottom soft-top">
        <section className="push-bottom">
          <button onClick={this.hide} className="locked-right push-right push-half-top"><small>Cancel</small></button>
          <form onSubmit={this.searchSubmit} className="hard push-double-right">
            <div className="input hard-bottom push-right">
              <i className="icon-search locked-left push-half-top"></i>
              <input id="search" type="text" placeholder="Search coming soon..." className="h5 text-dark-primary soft-double-left" />
            </div>
          </form>
        </section>
        {() => {
          if (this.props.search.none) {
            return <h6 className="soft-sides">No results for {this.props.search.term}!</h6>
          }
          if (this.props.search.items.length > 0) {
            return (
              <section className="background--light-secondary soft-half">
                {this.props.search.items.map((item, i) => {
                  return <Item item={item} key={i} />
                })}
                {() => {
                  if (!this.props.search.done) {
                    return (
                      <div className="text-center push-double-top">
                        <button
                          className="btn--dark-tertiary"
                          onClick={this.loadMore}
                        >
                        {() => {
                          if (this.props.search.loading) {
                            return "Loading..."
                          } else {
                            return "Load More Results"
                          }
                        }()}
                        </button>
                      </div>
                    )
                  }
                }()}
              </section>
            );
          }
        }()}
      </section>
    )
  }
}
