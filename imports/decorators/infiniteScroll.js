
import { Component, createElement, PropTypes } from "react";
import Loading from "../components/loading";

const defaultOptions = { percent: 70 };
const defaultReducer = x => x;


export default (reducer = defaultReducer, options = defaultOptions) => (WrappedComponent) => {
  class InfiniteScrollContainer extends Component {

    static propTypes = {
      loading: PropTypes.bool,
      done: PropTypes.bool,
    }

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
      const threshold = options.percent * 0.01;

      if ((scrollPosition + deviceHeight) / contentHeight > threshold) {
        const { loading, fetchMore, done } = reducer(this.props);
        // if the query is in flight, hold off
        if (loading || done) return null;

        // fetch more goodness
        fetchMore();
      }
    }

    renderLoading = () => {
      if (!this.props.loading) return null;
      return (
        <div className="one-whole soft-double text-center display-inline-block">
          <Loading />
        </div>
      );
    }

    render() {
      const mergedProps = { ...this.props, ...{ Loading: this.renderLoading } };
      return createElement(WrappedComponent, mergedProps);
    }

  }

  return InfiniteScrollContainer;
};
