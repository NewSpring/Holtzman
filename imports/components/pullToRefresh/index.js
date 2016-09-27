import { PropTypes } from "react";
import { connect } from "react-apollo";
import ReactPullToRefresh from "react-pull-to-refresh";

const mapStateToProps = state => ({
  isLive: state.live.live,
  show: state.live.show,
});

const ApollosPullToRefresh = ({ handleRefresh, children }) => (
  <div>
    <div className="ptr-fake-background" />

    <ReactPullToRefresh
      onRefresh={handleRefresh}
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
      {children}
    </ReactPullToRefresh>
  </div>
);

ApollosPullToRefresh.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};


export default connect({ mapStateToProps })(ApollosPullToRefresh);
