import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import { css } from "aphrodite";

import liveActions from "../../store/live";
import Discover from "../../blocks/discover";
import styles from "../../blocks/nav/offset-css";

const mapStateToProps = state => ({ audio: state.audio });

@connect({ mapStateToProps })
class Template extends Component {

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

const Routes = [
  {
    path: "/discover",
    component: Template,
  },
];

export default {
  Routes,
};
