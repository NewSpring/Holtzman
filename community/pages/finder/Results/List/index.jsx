
import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { VelocityComponent } from "velocity-react"

import { nav as navActions } from "../../../../../core/store"

import List from "./List"
import Filter from "./Filter"

const map = (state) => ({
  campuses: state.campuses.campuses,
})

@connect(map)
export default class ListView extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

  state = {
    showFilters: false
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"))
  }

  toggleFilters = (e) => {
    e.preventDefault()
    this.setState({
      showFilters: !this.state.showFilters
    })
  }


  render () {
    const {
      topics,
      filter,
      onClick,
      groups,
      hash,
      count,
      showMore,
      status,
      onHover,
      done,
    } = this.props

    let campuses = [{
      id: -1,
      name: "All Campuses"
    }]

    for (let campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus])
    }

    campuses = campuses.map((x) => ({
      label: x.name,
      value: x.id
    }))

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={500}
        runOnMount={this.context.shouldAnimate}
      >
        <div>

          <List
            groups={groups}
            onClick={onClick}
            hash={hash}
            showFilters={this.toggleFilters}
            filter={this.state.showFilters}
            count={count}
            showMore={showMore}
            status={status}
            done={done}
            onHover={onHover}
          >
          {() => {
            if (this.state.showFilters) {
              return(
                <Filter
                  topics={topics}
                  filter={filter}
                  campuses={campuses}
                />
              )
            }
          }()}
          </List>

        </div>
      </VelocityComponent>
    )
  }
}
