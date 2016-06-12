import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Headerable } from "../../../core/mixins/"

import { Sections } from "../../collections"
import modal from "../../store/modal"
import { sections as sectionActions, nav as navActions } from "../../store"

import Groups from "./Groups"

const map = (state) => ({ sections: state.sections })

@connect(map)
@ReactMixin.decorate(Headerable)
export default class SectionsContainer extends Component {

  componentDidMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    this.props.dispatch(modal.update({keepNav: true}))

    console.log("SECTIONS HA");
    this.headerAction({
      title: "Sections"
    });
  }

  componentWillUnmount() {
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
