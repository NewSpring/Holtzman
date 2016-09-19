import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";

import navActions from "../../store/nav";
import headerActions from "../../store/header";
import Video from "../../components/players/video";

import styles from "../../blocks/nav/offset-css";

@connect()
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    this.props.dispatch(headerActions.set({
      title: "Live Now",
    }));
  }

  render() {
    const { embedCode } = this.props.params;

    return (
      <div className={`locked-ends locked-sides background--dark-primary floating ${css(styles.offset)}`}>
        <div className="floating__item one-whole">
          <Video id={embedCode} ref="video" />
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
