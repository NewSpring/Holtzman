import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Sections } from "../../collections"
import modal from "../../store/modal"
import sectionActions from "../../store/sections"
import Groups from "./Groups"

const map = (state) => ({ sections: state.sections })

const bindSections = (props) => {
  const { dispatch } = props

  let handle = {}
  Tracker.autorun((computation) => {
    // return computation for dismount
    handle = computation

    // subscribe to sections
    Meteor.subscribe("sections")

    // pull all the sections data
    let sections = Sections.find().fetch()

    let _sections = {}
    for (let _item of sections) { _sections[_item._id] = _item }

    // persist in the store
    dispatch(sectionActions.set(_sections))

  })

  return { handle }

}

@connect(map)
export default class SectionsContainer extends Component {

  componentWillMount(){
    let { handle } = bindSections(this.props)
    this.handle = handle
  }

  componentWillUnmount(){
    this.handle.stop()
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
