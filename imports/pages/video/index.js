import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";

import navActions from "../../data/store/nav";
import headerActions from "../../data/store/header";
import Video from "../../components/@primitives/players/video";
import wowzaRoute from "./wowza";

import styles from "../../components/@primitives/nav/offset-css";
import Meta from "../../components/shared/meta";

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    this.props.dispatch(
      headerActions.set({
        title: "Live Now",
      })
    );
  }

  render() {
    const { embedCode } = this.props.params;

    return (
      <div
        className={`locked-ends locked-sides background--dark-primary floating ${css(
          styles.offset
        )}`}
      >
        <Meta title="Watch Live Services" />
        <div className="floating__item one-whole">
          <Video id={embedCode} ref="video" />
        </div>
      </div>
    );
  }
}

const Template = connect()(TemplateWithoutData);

const Routes = [
  {
    path: "/video/:embedCode",
    component: Template,
  },
  wowzaRoute.Route,
];

export default {
  Routes,
};

export { TemplateWithoutData };
