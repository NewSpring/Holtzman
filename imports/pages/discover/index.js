import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";
import Meta from "../../components/shared/meta";

import liveActions from "../../data/store/live";
import Discover from "../../components/discover";
import styles from "../../components/@primitives/nav/offset-css";

class DiscoverWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    audio: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(liveActions.hide());
  }

  componentWillUnmount() {
    this.props.dispatch(liveActions.show());
  }

  containerStyles = () => (
    {
      paddingBottom: this.props.audio.state === "default" ? "10px" : "50px",
    }
  )

  render() {
    return (
      <div
        className={
          "background--light-primary locked-ends locked-sides " +
          `scrollable soft-double-bottom ${css(styles.offset)}`
        }
        data-status-scroll-container
      >
        <Meta title="Discover" />
        <div
          style={this.containerStyles()}
          data-status-scroll-item
          data-status-scroll-offset={-50}
        >
          <Discover />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ audio: state.audio });
const Template = connect(mapStateToProps)(DiscoverWithoutData);

const Routes = [
  {
    path: "/discover",
    component: Template,
  },
];

export default {
  Routes,
};

export {
  DiscoverWithoutData,
};
