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

  state = {
    page: 0,
    pageSize: 10,
    loading: false,
    done: false,
    none: false
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false}))
  }

  getSearch(term, options = { clear: false }) {
    const { dispatch } = this.props
    let { page, pageSize } = this.state

    if (options.clear) {
      page = 0;
      this.setState({ page: 0 });
      dispatch(searchActions.clear());
    }

    // + 1 even though it's strange
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
        this.setState({ page: page + 1, loading: false });
        dispatch(searchActions.add(search.items));
        if (search.total === 0) {
          this.setState({ none: true });
        }
        if (this.props.search.items.length >= search.total) {
          this.setState({ done: true });
        }
      })

  }

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  searchSubmit = (event) => {
    event.preventDefault();
    let term = document.getElementById("search").value;
    this.props.dispatch(searchActions.clear());
    this.setState({ loading: true, done: false, none: false });
    // couldn't get term to update state before searching
    this.getSearch(term, { clear: true });
  }

  loadMore = (event) => {
    event.preventDefault();
    let term = document.getElementById("search").value;
    this.setState({ loading: true });
    this.getSearch(term);
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
          if (this.state.none) {
            return <h6 className="soft-sides">No results for {document.getElementById("search").value}!</h6>
          }
          if (this.props.search.items.length > 0) {
            return (
              <section className="background--light-secondary soft-half">
                {this.props.search.items.map((item, i) => {
                  return <Item item={item} key={i} />
                })}
                {() => {
                  if (!this.state.done) {
                    return (
                      <div className="text-center push-double-top">
                        <button
                          className="btn--dark-tertiary"
                          onClick={this.loadMore}
                        >
                        {() => {
                          if (this.state.loading) {
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
