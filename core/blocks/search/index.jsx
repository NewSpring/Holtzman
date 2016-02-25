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
        <section className="push-bottom">
          <button onClick={this.hide} className="locked-right push-right push-half-top"><small>Cancel</small></button>
          <form onSubmit={this.searchSubmit} className="hard push-double-right">
            <div className="input hard-bottom push-right">
              <i className="icon-search locked-left push-half-top"></i>
              <input id="search" type="text" placeholder="Search coming soon..." className="h5 text-dark-primary soft-double-left" />
            </div>
          </form>
        </section>
        <section className="background--light-secondary soft-half">
          {this.props.search.items.map((item, i) => {
            return <Item item={item} key={i} />
          })}
        </section>
      </section>
    )
  }
}
