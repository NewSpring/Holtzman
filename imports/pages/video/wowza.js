import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";
import ReactJWPlayer from "react-jw-player";

import navActions from "../../data/store/nav";
import headerActions from "../../data/store/header";

import styles from "../../components/@primitives/nav/offset-css";
import Meta from "../../components/shared/meta";

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    this.props.dispatch(
      headerActions.set({
        title: "Live",
      }),
    );
  }

  render() {
    // const { embedCode } = this.props.params;

    return (
      <div
        className={`locked-ends locked-sides background--dark-primary floating ${css(
          styles.offset,
        )}`}
      >
        <Meta title="Watch Live Services" />
        <div className="floating__item one-whole">
          <ReactJWPlayer
            playerId="wowza-live-video"
            playerScript="//content.jwplatform.com/libraries/SgGdRKN7.js"
            // playlist="//content.jwplatform.com/players/eFu3SiOb-SgGdRKN7.js"
            playlist="//content.jwplatform.com/feeds/STml6Fs1.json"
          />,
        </div>
      </div>
    );
  }
}

const Template = connect()(TemplateWithoutData);

const Route = {
  path: "/wowza",
  component: Template,
};

export default {
  Route,
};

export { TemplateWithoutData };
