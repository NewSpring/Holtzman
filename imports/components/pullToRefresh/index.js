import { PropTypes } from "react";
import { connect } from "react-apollo";
import ReactPullToRefresh from "react-pull-to-refresh";

const mapStateToProps = state => ({
  isLive: state.live.live,
  show: state.live.show,
});

const ApollosPullToRefresh = () => (
  <div>
    <div className="ptr-fake-background" />

    <ReactPullToRefresh
      onRefresh={this.props.handleRefresh}
      hammerOptions={{ touchAction: "auto" }}
      icon={
        <i
          className="icon-leaf-outline"
          style={{
            transformOrigin: "17px 21px",
            marginTop: "-8px",
            marginLeft: "-17px",
          }}
        />
      }
      loading={
        <i
          className="loading icon-leaf-outline"
          style={{
            transformOrigin: "17px 21px",
            marginTop: "-8px",
            marginLeft: "-17px",
          }}
        />
      }
      className="relative"
    >
      {this.props.children}
    </ReactPullToRefresh>
  </div>
);

ApollosPullToRefresh.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};


export default connect({ mapStateToProps })(ApollosPullToRefresh);
