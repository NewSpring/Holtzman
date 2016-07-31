import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { Video } from "/imports/components/players"

import navActions from "apollos-core/dist/core/store/nav";
import headerActions from "apollos-core/dist/core/store/header"

@connect()
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    this.props.dispatch(headerActions.set({
      title: "Live Now",
    }));
  }

  render() {
    let { embedCode } = this.props.params;

    return (
      <div className="locked-ends locked-sides background--dark-primary floating">
        <div className="floating__item one-whole">
          <Video id={embedCode} ref="video"/>
        </div>
      </div>
    );
  }
}

const Routes = [
  {
    path: "/video/:embedCode",
    component: Template,
  },
];

export default {
  Routes,
};
