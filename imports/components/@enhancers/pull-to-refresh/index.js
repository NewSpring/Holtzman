import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ReactPullToRefresh from "react-pull-to-refresh";

const ApollosPullToRefreshWithoutData = ({ handleRefresh, children }) => (
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

ApollosPullToRefreshWithoutData.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const map = ({ live }) => ({
  isLive: live.live,
  show: live.show,
});

const withRedux = connect(map);

export default withRedux(ApollosPullToRefreshWithoutData);

export {
  ApollosPullToRefreshWithoutData,
  map,
  withRedux,
};
