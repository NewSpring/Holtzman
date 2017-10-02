import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import ReactMixin from "react-mixin";

import Headerable from "../../../deprecated/mixins/mixins.Header";

import modal from "../../../data/store/modal";

import {
  nav as navActions,
} from "../../../data/store";

import Groups from "./Groups";

class SectionsContainerWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sections: PropTypes.object.isRequired,
    web: PropTypes.bool,
  }

  componentDidMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.props.web || process.env.WEB) {
      this.props.dispatch(modal.update({
        keepNav: true,
        modalBackground: "light",
      }));
    }

    this.lockHeader("SectionsContainer");
    this.headerAction({
      title: "Sections",
    }, "SectionsContainer");
  }

  componentWillUnmount() {
    this.props.dispatch(modal.update({ keepNav: false }));
    this.unlockHeader();
  }

  hide = () => (this.props.dispatch(modal.hide()))

  render() {
    const { content } = this.props.sections;

    const items = [];

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const section in content) {
      items.push(content[section]);
    }

    const chunkedItems = [];
    while (items.length) {
      chunkedItems.push(items.splice(0, 2));
    }

    return (
      <section className="hard">
        <Groups items={chunkedItems} hide={this.hide} />
      </section>
    );
  }
}

const map = (state) => ({ sections: state.sections });
const withRedux = connect(map);
const withHeader = ReactMixin.decorate(Headerable);
export default withRedux(withHeader(SectionsContainerWithoutData));

export {
  SectionsContainerWithoutData,
  map,
  withRedux,
  withHeader,
};
