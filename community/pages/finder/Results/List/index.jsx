
import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { nav as navActions } from "../../../../../core/store"

import List from "./List"
import Filter from "./Filter"

@connect()
export default class ListView extends Component {

  state = {
    showFilters: false
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  toggleFilters = (e) => {
    e.preventDefault()
    this.setState({
      showFilters: !this.state.showFilters
    })
  }


  render () {
    const { topics, filter, onClick, groups, hash } = this.props

    return (
      <div>

        <List
          groups={groups}
          onClick={onClick}
          hash={hash}
          showFilters={this.toggleFilters}
          filter={this.state.showFilters}
        >
        {() => {
          if (this.state.showFilters) {
            return(
              <Filter
                topics={topics}
                filter={filter}
              />
            )
          }
        }()}
        </List>

      </div>
    )
  }
}
