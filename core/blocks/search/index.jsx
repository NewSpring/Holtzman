import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "../../../core/graphql"
import modal from "../../store/modal"

import { search as searchActions } from "../../store"

const map = (state) => ({ search: state.search })
@connect(map)
export default class SearchContainer extends Component {

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false}))
  }

  getSearch(term) {
    const { dispatch } = this.props

    dispatch(searchActions.clear());

    let query = `
      {
        search(query: "${term}", first: 10, site: "https://newspring.cc") {
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
        dispatch(searchActions.add(search.items));
      })

  }

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  searchSubmit = (event) => {
    event.preventDefault();
    let term = document.getElementById("search").value;
    this.getSearch(term);
  }

  render(){
    return (
      <section className="hard-sides soft-ends">
        <form onSubmit={this.searchSubmit}>
          <input type="text" id="search" />
        </form>
        {this.props.search.items.map((item) => {
          return <p>{item.title}</p>
        })}
      </section>
    )
  }
}
