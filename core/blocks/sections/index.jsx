import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Sections } from "../../collections"
import modal from "../../store/modal"
import sectionActions from "../../store/sections"
import Groups from "./Groups"

const map = (state) => ({ sections: state.sections })


@connect(map)
export default class SectionsContainer extends Component {

  componentWillUnmount(){
    this.props.dispatch(modal.update({keepNav: false}))
  }

  hide = () => {
    return this.props.dispatch(modal.hide())
  }

  render(){
    let count = 0
    let { content } = this.props.sections

    let items = []

    for (let section in content) {
      items.push(content[section])
    }

    let chunkedItems = []
    while (items.length) {
      chunkedItems.push(items.splice(0, 2))
    }

    return <Groups items={chunkedItems} hide={this.hide} />
  }
}
