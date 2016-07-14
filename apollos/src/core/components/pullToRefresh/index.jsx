import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-apollo";
import ReactPullToRefresh from "react-pull-to-refresh";

const mapStateToProps = (state) => ({
  isLive: state.live.show,
});

@connect({ mapStateToProps })
export default class ApollosPullToRefresh extends Component {

  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
  }

  render() {

    return (
      <div>
        <div className="ptr-fake-background">
        </div>

        {(() => { if (this.props.isLive) return (
          <style>
            {".ptr-element i {\
              top: 100px;\
            }"}
          </style>
        ); })()}

        <ReactPullToRefresh
          onRefresh={this.props.handleRefresh}
          icon={<i className="icon-leaf-outline"></i>}
          loading={<i className="loading icon-leaf-outline"></i>}
        >
          {this.props.children}
        </ReactPullToRefresh>
      </div>
    );

  };

};