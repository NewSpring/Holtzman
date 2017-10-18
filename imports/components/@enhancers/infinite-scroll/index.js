import PropTypes from "prop-types";
import { Component, createElement } from "react";
import Loading from "../../@primitives/UI/loading";

const defaultOptions = { percent: 70 };
const defaultReducer = x => x;

export default (reducer = defaultReducer, options) => WrappedComponent => {
  const mergedOptions = { ...defaultOptions, ...options };
  class InfiniteScrollContainer extends Component {
    static propTypes = {
      loading: PropTypes.bool, // eslint-disable-line
      done: PropTypes.bool // eslint-disable-line
    };

    state = { loading: false };

    componentDidMount() {
      if (typeof window !== "undefined" && window !== null) {
        window.addEventListener("scroll", this.bindPageOnScroll); // eslint-disable-line
      }
    }

    componentWillUnmount() {
      if (typeof window !== "undefined" && window !== null) {
        window.removeEventListener("scroll", this.bindPageOnScroll); // eslint-disable-line
      }
    }

    bindPageOnScroll = () => {
      const scrollPosition = window.scrollY;
      const deviceHeight = window.outerHeight;
      const contentHeight = document.body.clientHeight;
      const threshold = mergedOptions.percent * 0.01;

      if ((scrollPosition + deviceHeight) / contentHeight > threshold) {
        const { loading, fetchMore, done } = reducer(this.props);
        // if the query is in flight, hold off
        if (typeof loading === "undefined" || loading || done) return null;
        if (this.state.loading) return null;

        this.setState({ loading: true });
        // fetch more goodness
        fetchMore().then(x => {
          this.setState({ loading: false });
          return x;
        });
      }
      return null;
    };

    renderLoading = () => {
      const { loading, done } = reducer(this.props);
      let isLoading = loading;
      if (!isLoading) isLoading = this.state.loading;

      if (!isLoading && done && mergedOptions.doneText) {
        return (
          <div className="one-whole soft-double text-center display-inline-block">
            <p className="flush">
              <small>
                <em>{mergedOptions.doneText}</em>
              </small>
            </p>
          </div>
        );
      }
      if (!isLoading || done) return null;
      return (
        <div className="one-whole soft-double text-center display-inline-block">
          <Loading />
        </div>
      );
    };

    render() {
      const mergedProps = { ...this.props, ...{ Loading: this.renderLoading } };
      return createElement(WrappedComponent, mergedProps);
    }
  }

  return InfiniteScrollContainer;
};
