import { paging as pagingActions } from "apollos/dist/core/store";

const Pageable = {

  componentDidMount: function() {
    this._bindPageOnScroll = this._pageOnScroll.bind(this);
    window.addEventListener("scroll", this._bindPageOnScroll);
  },

  componentWillUnmount: function() {
    window.removeEventListener("scroll", this._bindPageOnScroll);
    this.props.dispatch(pagingActions.reset());
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data.loading) return false

    return true;
  },

  _pageOnScroll: function(event) {
    if (this.props.paging.done) return

    if (window.scrollY / document.body.clientHeight > 0.8 && this.props.paging.shouldUpdate) {
      this.props.dispatch(pagingActions.pause());
      this.props.dispatch(pagingActions.increment());

      // wait a bit to prevent paging multiple times
      setTimeout(() => {
        this.props.dispatch(pagingActions.resume());
      }, 1000);
    }
  },

}

export default Pageable
