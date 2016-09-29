
import { Component, createElement } from "react";

const defaultOptions = { percent: 70 };
const defaultReducer = x => x;
export default (reducer = defaultReducer, options = defaultOptions) => (WrappedComponent) => {
  class InfiniteScrollContainer extends Component {

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
        const { loading, fetchMore } = reducer(this.props);
        // if the query is in flight, hold off
        if (loading) return;

        // fetch more goodness
        fetchMore();
      }
    }

    render() {
      return createElement(WrappedComponent, this.props);
    }

  }

  return InfiniteScrollContainer;
};
