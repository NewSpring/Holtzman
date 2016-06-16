import { Component, PropTypes } from "react";
import { connect } from "apollos/core/graphql/apollo";

import Discover from "apollos/core/blocks/discover";

const mapStateToProps = (state) => ({ audio: state.audio });

@connect({ mapStateToProps })
class Template extends Component {

  containerStyles = () => {
    return {
      paddingBottom: this.props.audio.state === "default" ? "20px" : "60px",
    }
  }

  render() {
    return (
      <div className="background--light-primary locked-ends locked-sides scrollable soft-double-bottom">
        <div style={this.containerStyles()}>
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
