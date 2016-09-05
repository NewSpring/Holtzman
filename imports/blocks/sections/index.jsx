import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Headerable } from "../../../core/mixins/"

import { Sections } from "../../collections"
import modal from "../../store/modal"

import {
  sections as sectionActions,
  nav as navActions,
} from "../../store"

import Groups from "./Groups"

const map = (state) => ({ sections: state.sections })

@connect(map)
@ReactMixin.decorate(Headerable)
export default class SectionsContainer extends Component {

  componentDidMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    if (process.env.WEB) {
      this.props.dispatch(modal.update({
        keepNav: true,
        modalBackground: "light",
      }));
    }

    this.lockHeader("SectionsContainer");
    this.headerAction({
      title: "Sections"
    }, "SectionsContainer");
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({keepNav: false}));
    this.unlockHeader();
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

    return (
      <section className="hard">
        <Groups items={chunkedItems} hide={this.hide} />
      </section>
    );
  }
}
