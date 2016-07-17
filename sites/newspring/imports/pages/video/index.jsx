import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { Video } from "/imports/components/players"

import navActions from "apollos/dist/core/store/nav";

@connect()
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
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
