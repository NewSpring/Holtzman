import { Component, PropTypes } from "react";
import { connect } from "react-apollo";

import liveActions from "apollos-core/dist/core/store/live"
import Discover from "apollos-core/dist/core/blocks/discover";

const mapStateToProps = (state) => ({ audio: state.audio });

@connect({ mapStateToProps })
class Template extends Component {

  absoluteStyle = () => {
    if (process.env.NATIVE && window.outerWidth >= 768) {
      return {
        left: "80px",
      };
    }
  }

  containerStyles = () => {
    return {
      paddingBottom: this.props.audio.state === "default" ? "10px" : "50px",
    }
  }

  componentWillMount() {
    this.props.dispatch(liveActions.hide());
  }

  componentWillUnmount() {
    this.props.dispatch(liveActions.show());
  }

  render() {
    return (
      <div
        className="background--light-primary locked-ends locked-sides scrollable soft-double-bottom"
        style={this.absoluteStyle()}
        data-status-scroll-container={true}
      >
        <div
          style={this.containerStyles()}
          data-status-scroll-item={true}
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
