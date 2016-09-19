import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import ReactPullToRefresh from "react-pull-to-refresh";

const mapStateToProps = state => ({
  isLive: state.live.live,
  show: state.live.show,
});

@connect({ mapStateToProps })
export default class ApollosPullToRefresh extends Component {

  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
  }

  render() {
    const liveBannerVisible = this.props.isLive && this.props.show;

    return (
      <div>
        <div className="ptr-fake-background" />

        <ReactPullToRefresh
          onRefresh={this.props.handleRefresh}
          hammerOptions={{ touchAction: "auto" }}
          icon={<i className="icon-leaf-outline" style={{
            transformOrigin: "17px 21px",
            marginTop: "-8px",
            marginLeft: "-17px",
          }} />}
          loading={<i className="loading icon-leaf-outline" style={{
            transformOrigin: "17px 21px",
            marginTop: "-8px",
            marginLeft: "-17px",
          }} />}
          className="relative"
        >
          {this.props.children}
        </ReactPullToRefresh>
      </div>
    );
  }

}
